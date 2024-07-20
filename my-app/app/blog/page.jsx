import React from 'react'
import Footer from './components/footer'
import BlogContent from './components/blogcontent'
import BlogHeader from './components/header'
import Navbar from '../navbar'
function page() {
    return (
      <div>
        <Navbar/>
        <BlogHeader/>
        <BlogContent/>
        <Footer/>
      </div>
    )
  }
  
  export default page