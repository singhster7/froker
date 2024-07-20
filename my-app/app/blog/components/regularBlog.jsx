import React from 'react';
const blogPosts = [
    {
      id: 1,
      image: "https://picsum.photos/400/300?1",
      title: "Delegating Social Media Tasks ...",
      date: "23 April 224",
      author: "Varshita",
      excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike",
    },
    {
        id: 1,
        image: "https://picsum.photos/400/300?1",
        title: "Delegating Social Media Tasks ...",
        date: "23 April 224",
        author: "Varshita",
        excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike",
      },
      {
        id: 1,
        image: "https://picsum.photos/400/300?1",
        title: "Delegating Social Media Tasks ...",
        date: "23 April 224",
        author: "Varshita",
        excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike",
      },
      {
        id: 1,
        image: "https://picsum.photos/400/300?1",
        title: "Delegating Social Media Tasks ...",
        date: "23 April 224",
        author: "Varshita",
        excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike",
      },
      {
        id: 1,
        image: "https://picsum.photos/400/300?1",
        title: "Delegating Social Media Tasks ...",
        date: "23 April 224",
        author: "Varshita",
        excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike",
      },
      {
        id: 1,
        image: "https://picsum.photos/400/300?1",
        title: "Delegating Social Media Tasks ...",
        date: "23 April 224",
        author: "Varshita",
        excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike",
      },
     
    
]

const Regular = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-5">Recent Posts</h2>
      <div className="flex justify-around  flex-wrap text-ellipsis">
      {blogPosts.map(post => (
        <div className="w-1/3 my-5 text-left p-2">
          <img src={post.image} alt="Blog post 1" className="w-full h-auto rounded-lg" />
          <div className="p-2 overflow-hidden text-ellipsis">
            <div className="text-orange-500">by-{post.author} -{post.date}</div>
            <h3 className="my-2">{post.title}</h3>
            <p className="my-1 overflow-hidden text-ellipsis">{post.excerpt}</p>
            <a className="text-orange-500 underline cursor-pointer" href="#">Read More...</a>
          </div>
        </div>
         ))}
       
       
     
      </div>
    </div>
  );
};

export default Regular;
