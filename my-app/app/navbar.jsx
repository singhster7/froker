"use client";
import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {


  const links = useMemo(
    () => [
      { id: 1, link: "/blog", label: "Home" },
      { id: 2, link: "/Shop", label: "Blog" },
      { id: 3, link: "/groom", label: "Discover Froker" },
      //{ id: 4, link: "/consult", label: "Consult" },
      //{ id: 5, link: "/events", label: "Events" },
    ],
    []
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      // setUser(JSON.parse(userData));
    }
  }, []);

  

 

  return (
    <div className="flex justify-between items-center w-full h-[60px] px-20 text-black bg-gradient-to-r from-orange-450  to-orange-950 nav sticky top-0 z-20">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-signature ml-2">
          <a href="/">
            <Image
              src="https://i.postimg.cc/BbcmB4cK/download.png"
              alt="Logo"
              width={130}
              height={28}
              priority
            />
          </a>
        </h1>
      </div>
      <ul className="hidden md:flex pr-[30px] justify-end gap-[20px] flex-grow">
        {links.map(({ id, link, label }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize text-[20px] text-[--white-text-ridlley] hover:text-[--medium-yellow-ridlley] duration-200 link-underline"
          >
            <Link href={link} prefetch>
              <div className="flex items-center">{label}</div>
            </Link>
          </li>
        ))}
      </ul>
      
    
     
    
    </div>
  );
};

export default Navbar;
