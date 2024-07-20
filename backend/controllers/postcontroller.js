const AppError = require("../utils/appError");
const { pool } = require("./../services/database");
const catchAsync = require("./../utils/catchAsync");
const moment = require("moment");
const generatePreSignedUrl = require("./../services/s3PreSigner");
const { v4: uuidv4 } = require("uuid");


// Controller function to create a new blog post
exports.uploadPost = catchAsync(async (req, res, next) => {
  const { user_id } = req.user;
  const key = `blog-posts/${user_id}-${uuidv4()}`;

  const preSignedUrl = await generatePreSignedUrl(key, "put");

  res.status(200).json({ status: "success", url: preSignedUrl, key });
});
exports.createBlogPost = async (req, res) => {
  const { user_id } = req.body;
  const { title, content, image_key } = req.body;
  let { topic } = req.body;
  if (typeof topic === "string") {
    topic = JSON.parse(topic);
  }

  //   const client = await pool.connect();
  try {
    // await client.query("BEGIN");

    // Insert the new blog post
    const postResult = await pool.query(
      `INSERT INTO posts (user_id, title, content, image)
            VALUES ($1, $2, $3, $4)
            RETURNING post_id`,
      [user_id, title, content, image_key || null]
    );
    const postId = postResult.rows[0].post_id;

    // Check if the topic exists, if not, insert it into the topics table
    let topicIds = [];
    for (const topicName of topic) {

    const topicResult = await pool.query(
      `SELECT topic_id FROM topics WHERE name = $1`,
      [topicName]
    );

    let topicId;
    if (topicResult.rows.length === 0) {
      const insertTopicResult = await pool.query(
        `INSERT INTO topics (name)
         VALUES ($1)
         RETURNING topic_id`,
        [topicName]
      );
      topicId = insertTopicResult.rows[0].topic_id;
    } else {
      topicId = topicResult.rows[0].topic_id;
    }
    topicIds.push(topicId);
  }

  for (const topicId of topicIds) {
    await pool.query(
      `INSERT INTO post_topics (post_id, topic_id)
       VALUES ($1, $2)`,
      [postId, topicId]
    );
  }
    await pool.query("COMMIT");
    res.status(201).json(postResult.rows[0]);
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to retrieve blog information using the provided post_id
exports.getBlogInfoById = async (req, res) => {
  const post_id = req.params.post_id;

  try {
    const result = await pool.query(
      `SELECT 
        posts.post_id, 
        posts.title, 
        posts.content, 
        posts.image, 
        posts.created_at, 
        posts.updated_at,
        post_author.first_name || ' ' || post_author.last_name AS author_name, 
        post_author.email,
        ARRAY_AGG(t.name) AS topics,
        COALESCE(
          ARRAY_AGG(
            jsonb_build_object(
              'comment_id', c.comment_id,
              'content', c.content,
              'user_id', c.user_id,
              'user_name', comment_author.first_name || ' ' || comment_author.last_name,
              'user_picture', comment_author.profile_picture_url,
              'created_at', c.created_at
            )
          ) FILTER (WHERE c.comment_id IS NOT NULL), '{}'
        ) AS comments
      FROM posts
      JOIN users AS post_author ON posts.user_id = post_author.user_id
      LEFT JOIN post_topics pt ON posts.post_id = pt.post_id
      LEFT JOIN topics t ON pt.topic_id = t.topic_id
      LEFT JOIN comments c ON c.post_id = posts.post_id
      LEFT JOIN users AS comment_author ON c.user_id = comment_author.user_id
      WHERE posts.post_id = $1
      GROUP BY posts.post_id, post_author.user_id`,
      [post_id]
    );

    const blogInfo = result.rows[0];

    // Check if the blog post exists
    if (!blogInfo) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    if (blogInfo.image) {
      blogInfo.image = await generatePreSignedUrl(blogInfo.image, "get");
    }

    res.status(200).json(blogInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addLike = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;

  try {
    const result = await pool.query(
      "SELECT liked FROM post_likes WHERE post_id=$1 AND user_id=$2",
      [post_id, user_id]
    );

    let newLikeStatus;
    if (result.rows.length > 0) {
      // Like exists, toggle the current status
      newLikeStatus = !result.rows[0].liked;
      await pool.query(
        "UPDATE post_likes SET liked=$1, updated_at=CURRENT_TIMESTAMP WHERE post_id=$2 AND user_id=$3",
        [newLikeStatus, post_id, user_id]
      );
    } else {
      // First time liking
      newLikeStatus = true;
      await pool.query(
        "INSERT INTO post_likes (post_id, user_id, liked, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        [post_id, user_id, newLikeStatus]
      );
    }

    res.status(200).json({
      status: "Success",
      message: "Like status updated successfully",
      liked: newLikeStatus,
    });
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while updating like status",
    });
  }
};

//can be  used to get the linked status and also for storing all the posts liked liked by the user
exports.getUserLikedPosts = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT post_id FROM post_likes WHERE user_id=$1 AND liked=true",
      [user_id]
    );

    const likedPosts = result.rows.map((row) => row.post_id);

    res.status(200).json({
      status: "Success",
      likedPosts,
    });
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while fetching liked posts",
    });
  }
};

exports.addComment = catchAsync(async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  const { content } = req.body;
  //   const result = await pool.query(
  //     "SELECT * FROM comments WHERE comment_id=$1 AND post_id=$2",
  //     [comment_id, post_id]
  //   );
  await pool.query(
    "INSERT INTO comments (post_id,user_id,content,created_at,updated_at) VALUES($1,$2,$3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)",
    [post_id, user_id, content]
  );
  res.status(200).json({
    status: "success",
    message: "Updated Comments succesfully!",
  });
});

//  function to fetch all the posts according to trending/recent and most commented
exports.getPosts = catchAsync(async (req, res) => {
  const section = req.query.section;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let orderByClause = "";
  if (section === "trending") {
    orderByClause = "ORDER BY like_count DESC";
  } else if (section === "most_commented") {
    orderByClause = "ORDER BY comment_count DESC";
  } else {
    orderByClause = "ORDER BY created_at DESC";
  }

  try {
    const query = ` SELECT 
        u.first_name,
        u.last_name,
        p.title,
        p.image,
        p.post_id,
        p.content AS description,
        p.like_count,
        p.comment_count,
        p.created_at,
        ARRAY_AGG(t.name) AS topics
  
      FROM 
        posts p
      JOIN 
        users u ON p.user_id = u.user_id
      LEFT JOIN 
        post_topics pt ON p.post_id = pt.post_id
      LEFT JOIN 
        topics t ON pt.topic_id = t.topic_id
      GROUP BY 
        u.first_name, u.last_name, p.post_id
      ${orderByClause}
      LIMIT $1 OFFSET $2;
    `;

    // 1-JOIN users table to get user details (first name, last name) for each post.
    // 2-LEFT JOIN post_topics table to associate posts with their topics.
    // 3-LEFT JOIN topics table to get the name of each topic associated with posts.

    // Execute the query with limit and offset parameters
    const result = await pool.query(query, [limit, offset]);
    const updatedRows = await Promise.all(
      result.rows.map(async (row) => {
        if (row.image) {
          row.image = await generatePreSignedUrl(row.image, "get");
        }
        return row;
      })
    );

    res.status(200).json(updatedRows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  to fetch all blog posts of a specific user
exports.getUserBlogPosts = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    //console.log(`Query result: ${JSON.stringify(result.rows)}`);
    const updatedRows = await Promise.all(
      result.rows.map(async (row) => {
        if (row.image) {
          row.image = await generatePreSignedUrl(row.image, "get");
        }
        return row;
      })
    );
    res.status(200).json(updatedRows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.getUserLikedPosts = catchAsync(async (req, res) => {
//   const { user_id } = req.params;
// const result=await pool.query(query,[limit,])
//   res.status(200).json({ status: "success", data: result.rows });
// });

// will use this API later

// exports.getPostWhenLoggedIn = catchAsync(async (req, res) => {
//   const { user_id } = req.user;
//   //   console.log(req.user);
//   //   console.log(user_id);
//   const section = req.query.section;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = (page - 1) * limit;

//   let orderByClause = "";

//   if (section === "trending") {
//     orderByClause = "ORDER BY like_count DESC";
//   } else if (section === "most_commented") {
//     orderByClause = "ORDER BY comment_count DESC";
//   } else {
//     orderByClause = "ORDER BY created_at DESC";
//   }

//   const query = `
//       SELECT
//         u.first_name,
//         u.last_name,
//         p.post_id,
//         p.title,
//         p.content AS description,
//         p.like_count,
//         p.comment_count,
//         p.created_at,
//         ARRAY_AGG(DISTINCT t.name) AS topics,
//         COALESCE(pl.liked, false) AS liked,
//         COALESCE(
//             ARRAY_AGG(
//               jsonb_build_object(
//                 'comment_id', c.comment_id,
//                 'content', c.content,
//                 'user_id', c.user_id,
//                 'created_at', c.created_at
//               )
//             ) FILTER (WHERE c.comment_id IS NOT NULL), '{}'
//           ) AS comments
//       FROM
//         posts p
//       JOIN
//         users u ON p.user_id = u.user_id
//       LEFT JOIN
//         post_topics pt ON p.post_id = pt.post_id
//       LEFT JOIN
//         topics t ON pt.topic_id = t.topic_id
//       LEFT JOIN
//         post_likes pl ON p.post_id = pl.post_id AND pl.user_id = $3
//       LEFT JOIN
//         comments c ON p.post_id = c.post_id
//       GROUP BY
//         u.first_name, u.last_name, p.post_id, p.title, p.content, p.like_count, p.comment_count, p.created_at, pl.liked
//       ${orderByClause}
//       LIMIT $1 OFFSET $2;
//     `;
//   const result = await pool.query(query, [limit, offset, user_id]);

//   // Execute the query with limit and offset parameters

//   res.status(200).json({ status: "success", data: result.rows });
// });

exports.editBlog = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  const { post_id } = req.params;
  const { title, content, image_key } = req.body;

  const result = await pool.query(
    "SELECT created_at, user_id FROM posts WHERE post_id=$1",
    [post_id]
  );

  //If the post is deleted in between, return error
  if (result.rows.length === 0) {
    return res.status(404).json({
      status: "error",
      message: "Post Not Found!",
    });
  }

  if (result.rows[0].user_id != user_id) {
    return res.status(403).json({
      status: "error",
      message: "User Not allowed to edit this Post",
    });
  }

  const currentTime = moment();
  const createdAt = result.rows[0].created_at;
  const postCreationTime = moment(createdAt);
  const diff = moment.duration(currentTime.diff(postCreationTime)).asHours();

  if (diff > 6) {
    return res.status(403).json({
      status: "error",
      message: "You are allowed to edit a blog only within 6 hours of Post creation",
    });
  }

  await pool.query(
    `
    UPDATE posts 
    SET 
      title = COALESCE($1, title), 
      image = COALESCE($2, image), 
      content = COALESCE($3, content), 
      updated_at = CURRENT_TIMESTAMP 
    WHERE 
      post_id = $4
    `,
    [title || null, image_key || null, content || null, post_id]
  );

  res
    .status(200)
    .json({ status: "success", message: "Post updated successfully" });
});

exports.getTopics = catchAsync(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT topic_id, name FROM topics ORDER BY name ASC"
    );
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching topics",
    });
  }
});

// to delete a particular post written by a particular user
exports.deleteBlogPost = catchAsync(async (req, res) => {
  const { post_id, user_id } = req.params;

  try {
    // First, check if the post belongs to the user
    const result = await pool.query(
      'SELECT * FROM posts WHERE post_id = $1 AND user_id = $2',
      [post_id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found or not authorized to delete this post' });
    }

    // If the post exists and belongs to the user, delete it
    await pool.query(
      'DELETE FROM posts WHERE post_id = $1 AND user_id = $2',
      [post_id, user_id]
    );

    res.status(200).json({ status: 'Success', message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to fetch all posts saved by user
// exports.getSavedPostsByUser = async (req, res) => {
//   const { user_id } = req.params;

//   //console.log(`Received userId: "${user_id}"`); 

//   try {
//     // Get the saved posts for the given user ID
//     const savedPostsResult = await pool.query(
//       `SELECT p.post_id, p.title, p.content, p.image, p.like_count, p.comment_count, p.created_at, p.updated_at
//        FROM posts p
//        INNER JOIN saved_posts sp ON p.post_id = sp.post_id
//        WHERE sp.user_id = $1`,
//       [user_id]
//     );

//     // Log the result of the saved posts query
//     //console.log(`Saved posts query result: ${JSON.stringify(savedPostsResult)}`);

//     res.status(200).json(savedPostsResult.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.getSavedPostsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const savedPostsResult = await pool.query(
      `SELECT p.post_id, p.title, p.content, p.image, p.like_count, p.comment_count, p.created_at, p.updated_at
       FROM posts p
       INNER JOIN saved_posts sp ON p.post_id = sp.post_id
       WHERE sp.user_id = $1 AND sp.saved = TRUE`,
      [user_id]
    );
    res.status(200).json(savedPostsResult.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.toggleSavePost = async (req, res) => {
  const { user_id, post_id } = req.body;

  try {
    // Check if the post is already saved by the user
    const checkPostResult = await pool.query(
      `SELECT saved FROM saved_posts WHERE user_id = $1 AND post_id = $2`,
      [user_id, post_id]
    );

    if (checkPostResult.rowCount > 0) {
      // If the post is already saved, toggle the saved status
      const currentStatus = checkPostResult.rows[0].saved;
      const newStatus = !currentStatus;
      const updatePostResult = await pool.query(
        `UPDATE saved_posts SET saved = $1 WHERE user_id = $2 AND post_id = $3`,
        [newStatus, user_id, post_id]
      );

      const message = newStatus ? 'Post saved successfully.' : 'Post unsaved successfully.';
      return res.status(200).json({ message });
    } else {
      // If the post is not already saved, insert a new record with saved = TRUE
      const savePostResult = await pool.query(
        `INSERT INTO saved_posts (user_id, post_id, saved)
         VALUES ($1, $2, TRUE)`,
        [user_id, post_id]
      );

      return res.status(201).json({ message: 'Post saved successfully.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function to get posts by topic
exports.getPostsByTopic = async (req, res) => {
  const { topicName } = req.params;
  console.log(`Received topicName: "${topicName}"`);  // Log the received topic name

  try {
    // Log the query being executed
    console.log(`Executing query: SELECT topic_id FROM topics WHERE name = $1, with value: "${topicName}"`);

    // Get the topic_id for the given topic name
    const topicResult = await pool.query(
      `SELECT topic_id FROM topics WHERE name = $1`,
      [topicName]
    );

    // Log the result of the topic query
    console.log(`Topic query result: ${JSON.stringify(topicResult)}`);

    if (topicResult.rows.length === 0) {
      console.log(`No topic found with the name: "${topicName}"`);
      return res.status(404).json({ error: 'Topic not found' });
    }

    const topicId = topicResult.rows[0].topic_id;

    // Log the topicId
    console.log(`Found topicId: ${topicId}`);

    // Get the posts associated with the topic_id
    console.log(`Executing query to get posts for topicId: ${topicId}`);
    const postsResult = await pool.query(
      `SELECT p.post_id, p.user_id, p.title, p.content, p.image, p.like_count, p.comment_count, p.created_at, p.updated_at 
       FROM posts p
       JOIN post_topics pt ON p.post_id = pt.post_id
       WHERE pt.topic_id = $1`,
      [topicId]
    );

    // Log the result of the posts query
   // console.log(`Posts query result: ${JSON.stringify(postsResult)}`);

    res.status(200).json(postsResult.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};