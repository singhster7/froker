'use client'
import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRegClock } from 'react-icons/fa';
import Regular from '../components/regularBlog';

const BlogCard = () => {
  // State to manage if the post is liked or not
  const [isLiked, setIsLiked] = useState(false);

  // Toggle like state on click
  const handleLikeClick = () => {
    setIsLiked(prevState => !prevState);
  };

  return (
    <div>
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img 
          src="https://picsum.photos/700/300" // Use the appropriate path for your image
          alt="Delegating Social Media Tasks to AI"
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">DELEGATING SOCIAL MEDIA TASKS TO AI</h2>
          <div className="flex items-center text-orange-500 text-sm mb-4 relative">
            <span className="mr-2">by Roshan</span>
            <FaRegClock className="mr-1" />
            <span>2 minute read</span>
            <div className="flex items-center text-gray-500 absolute right-0">
              <button 
                onClick={handleLikeClick} 
                className="flex items-center focus:outline-none"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span className="ml-1">{isLiked ? '1 Like' : '0 Likes'}</span>
              </button>
            </div>
          </div>
          
          <div className="flex wrap justify-between">
           
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod voluptatum accusantium similique doloremque necessitatibus praesentium ipsa nulla ex excepturi optio architecto, hic distinctio iste eum incidunt consequuntur neque quae. Vel illo dolorem in magnam provident ducimus sapiente possimus esse porro quae, nulla beatae odio placeat hic eius officia voluptatum dolores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam vero numquam autem architecto quis culpa rerum voluptatibus sed porro? Illo ducimus quam adipisci assumenda culpa necessitatibus modi doloremque alias labore.</div>
          
          </div>
        </div>
      </div>
    </div>
    <Regular/>
    </div>
  );
};

export default BlogCard;
