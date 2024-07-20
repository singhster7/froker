import React from 'react'
import Footer from './components/footer'
import BlogContent from './components/blogcontent'
import BlogHeader from './components/header'
function page() {
    return (
      <div>
        <BlogHeader/>
        <BlogContent/>
        <Footer/>
      </div>
    )
  }
  
  export default page