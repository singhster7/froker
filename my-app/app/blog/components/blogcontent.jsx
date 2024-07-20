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
    <div className="p-36">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {blogPosts.length > 0 && (
            <div className="flex flex-col max-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
             <a href="">
             <img src={blogPosts[0].image} alt={`Post ${blogPosts[0].id}`} className="w-full h-auto" />
              <p className="text-sm text-gray-500 m-7">by {blogPosts[0].author} - {blogPosts[0].date}</p>
              <h2 className="text-lg m-6 truncate">{blogPosts[0].title}</h2>
              <p className="text-base text-gray-700 m-6 truncate">{blogPosts[0].excerpt}</p>
              <div href="#" className="text-orange-500 font-bold m-6 hover:underline">Read More...</div>
             </a>
              
            </div>
          )}
        </div>
        <div className="lg:col-span-1 flex flex-col gap-3 h-full">
          {blogPosts.slice(1).map((post) => (
            <div key={post.id} className="flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <a href="">
              <img src={post.image} alt={`Post ${post.id}`} className="w-full h-auto" />
              <p className="text-sm text-gray-500 m-1">by {post.author} - {post.date}</p>
              <h2 className="text-lg truncate m-1">{post.title}</h2>
              <p className="text-base text-gray-700 truncate m-1">{post.excerpt}</p>
              <div href="#" className="text-orange-500 hover:underline">Read More...</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
