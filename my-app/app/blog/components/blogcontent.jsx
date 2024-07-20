import React from 'react';

const blogPosts = [
  {
    id: 1,
    image: "https://picsum.photos/700/300",
    author: "Roshan",
    date: "3 May 2024",
    title: "Delegating Social Media Tasks...",
    excerpt: "In today's digital age, maintaining a vibrant social media presence is crucial for businesses and individuals alike. However, the demands of crafting ...",
  },
  {
    id: 2,
    image: "https://picsum.photos/700/300",
    author: "Varshita",
    date: "23 April 2024",
    title: "Summer Fashion Tips: Dressing...",
    excerpt: "Summer has arrived, bringing with it the perfect opportunity to shed those heavy layers and embrace the light, breezy vibes of the season. Whether you...",
  },
  {
    id: 3,
    image: "https://picsum.photos/700/300",
    author: "Varshita",
    date: "23 April 2024",
    title: "Why Brands Should Partner with...",
    excerpt: "In the digital marketing landscape, a powerful alliance is brewing between brands and creators, and it's transforming the way businesses connect with ...",
  },
  
];

const BlogContent = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl mb-5">Recent Posts</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="flex flex-col m-5 max-w-sm border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <img src={post.image} alt={`Post ${post.id}`} className="w-full h-auto" />
            <p className="text-sm text-gray-500 m-3">by {post.author} - {post.date}</p>
            <h2 className="text-lg m-3 truncate">{post.title}</h2>
            <p className="text-base text-gray-700 m-3 truncate">{post.excerpt}</p>
            <a href="#" className="text-orange-500 font-bold m-3 hover:underline">Read More...</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;
