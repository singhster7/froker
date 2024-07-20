# froker-submission-2129158
 ## THIS PROJECT IS DEPLOYED!!
 https://froker.vercel.app/blog
 ## images-<img width="960" alt="image" src="https://github.com/user-attachments/assets/b75e89e6-ebb5-41bb-8c7f-d6c9c2161039">
<img width="944" alt="image" src="https://github.com/user-attachments/assets/d4aa2231-7d77-482a-8ccc-55d6aed707c7">
<img width="956" alt="image" src="https://github.com/user-attachments/assets/aab9838f-f713-4612-b499-3997b0a30413">
<img width="953" alt="image" src="https://github.com/user-attachments/assets/28173070-11a2-4ca9-a789-517e7b8f9213">

<img width="944" alt="image" src="https://github.com/user-attachments/assets/a2b04fd2-983d-4738-8bf8-a7bf658ec4ea">


## Technology used
- **Frontend:** React.js, NextJs,TailwindCSS,Axios
- **Backend:** Node.js, Express.js, PostmanAPI(tool)
- **Database:** MongoDb
- **Authentication:** JSON Web Tokens (JWT)
- **Communication:** RESTful API
- **Version Control:** Git & Github

## Contributing

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Make your changes.
- Commit your changes (git commit -m 'your_message').
- Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.

## Installation

Prerequisites:

- Node.js should be installed on your machine


### Steps:
- Fork the Repo to your account
- Clone the Repo
```bash
git clone https://github.com/<username>/froker.git
```
- Install dependencies for frontend and run
```bash
  cd my-app
  npm install
  npm run dev
```
the frontend will start running on http://localhost:3000/blog

- Install dependencies for backend and run
```bash
  cd backend
  npm install
  npm start
```
the backend will start running on http://localhost:4000/

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Inside backend Directory

`POSTGRES_URL`
`JWT_SECRET`
`JWT_EXPIRES_IN`  
`JWT_COOKIE_EXPIRES_IN` 
`CLIENT_ID`
`CLIENT_SECRET`
`CLIENT_URL`
## Checkout the backend directory for more

### Get My Blogs
```http
  GET /api/v1/user/getMyBlogs
```
```
#### example of the parameters to test(json)
```json
   {
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "phone_number": "+1234567890"
  
  }   
```
### post blog

```http
  POST  api/v1/post/blog/blogPost
```

#### example of the parameters to test(json)
```json
  {
    "title": "Sample Post",
    "topic": ["Pet Care", "Dog"],
    "content": "This is a sample post",
    "image": "image_url.jpg"
  }  
```
### Edit Blog

```http
  PUT api/v1/post/blog/blogPost/62dfa996-3ddd-44ed-9842-238249039b8e/update
```

```json
{
  "title": "Sample Post edited",
  "content": "This is a sample post edited",
  "image_key": "image_url.jpg"
}

```http
  POST  api/v1/post/blog/blogInfo/:post_id
```

```http
  POST  api/v1/post/blog/blogPost/:post_id/like
```

```json
{
    "liked":true
} 
```
```http
  POST  api/v1/post/blog/blogPost/:post_id/comment
```
```json
{
    "content":"This is a sample comment"
}


###  retrieve blog information

```http
  GET  api/v1/post/blog/blogPost/:post_id
```

###  retrieve trending/most commented blog information

```http
  GET  api/v1/post/blog/posts?section=trending
```
```http
  GET  api/v1/post/blog/posts?section=most_commented
```
###  retrieve recent blog information

```http
  GET  api/v1/post/blog/posts
```
```http
  GET  api/v1/post/blog/posts/:user_id
```
```http
  DELETE  api/v1/post/blog/posts/:post_id/:user_id
```
```http
  GET  api/v1/post/blog/posts/postsPerTopic/:topicName
```

### Retrieve posts (trending/most commented/recent/saved) When user is logged in.

```http
  GET api/v1/post/blog/posts/loggedIn?section=trending
```
```http
  GET api/v1/post/blog/posts/saved/:user_id
```