import React from 'react';

const NewsletterSubscription = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white border-1 rounded-lg p-6 w-full max-w-4xl mx-auto mb-7">
      <div className="flex items-center p-8">
        <img 
          src="https://via.placeholder.com/150" // Replace this with your image URL
          alt="Newsletter"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="lg:w-1/2 lg:ml-6 mt-6 lg:mt-0">
        <h2 className="text-xl font-semibold mb-2">
          Subscribe to our newsletter to get the latest updates and news
        </h2>
        <form className="flex items-center relative">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="p-3 border border-gray-300 rounded-full w-full"
          />
          <button 
            type="submit" 
            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 absolute left-80"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
