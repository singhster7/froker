import React from 'react'
import Footer from './components/footer'
import BlogContent from './components/blogcontent'
import BlogHeader from './components/header'
import Navbar from '../navbar'
import Regular from './components/regularBlog'
import NewsletterSubscription from './components/letter'
function page() {
    return (
      <div>
        <Navbar/>
        <BlogHeader/>
        <BlogContent/>
        <Regular/>
        <NewsletterSubscription />
        <Footer/>
      </div>
    )
  }
  
  export default page