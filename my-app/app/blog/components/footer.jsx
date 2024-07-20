import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="bg-white py-10">
        <div className="container mx-auto flex flex-wrap justify-between items-start">
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <img src="https://i.postimg.cc/BbcmB4cK/download.png" alt="Froker Logo" className="w-24 mx-auto sm:mx-0" />
          </div>
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-2">Quicklink</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">Home</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">About us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">Privacy policy</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-2">Contacts</h3>
            <p className="text-gray-600">Whitefield, Bengaluru, 560066</p>
            <p className="text-gray-600 mb-4"><a href="mailto:support@froker.in" className="text-orange-500 hover:underline">support@froker.in</a></p>
            <div className="flex gap-2 w-[120px] sm:w-[180px] md:gap-4">
                <FaFacebook className="hover:text-blue-500 text-orange-500 lg:text-3xl text-2xl md:text-4xl" />
                <FaInstagram className="hover:text-purple-400 text-orange-500 lg:text-3xl text-2xl md:text-4xl" />
                <FaLinkedin className="hover:text-blue-700 text-orange-500 lg:text-3xl text-2xl md:text-4xl" />
                <FaYoutube className= "hover:text-red-700 text-orange-500 lg:text-3xl text-2xl md:text-4xl" />

            </div>
          </div>
          <div className="w-full sm:w-1/4">
            <h3 className="text-xl font-bold mb-2">Scan To Download</h3>
            <img src="https://i.postimg.cc/8zF50HsZ/froker-1-3-10-pb9yln.jpg" alt="QR Code" className="w-32 mx-auto sm:mx-0" />
          </div>
        </div>
        <img src="https://i.postimg.cc/L67kLb4v/froker.png" alt="" />
        <div className="bg-orange-400 py-7 mt-0">
                  </div>
      </footer>
    );
  };
  
  export default Footer;
  