import React from 'react'
import {BlogContainer,
  BlogRow,
  BlogData,
  BlogDelete,
  BlogCategory,
  BlogContent,
} from './BlogStyles'
import { useState } from 'react';

  
const Blog = ({tag, title, content, postId}) => {
  const [post, setPost] = useState('')
  
  const deletePost = () => {
    return fetch(`http://localhost:8000/blog/${postId}/`, {
      method: 'DELETE' 
    }).then(res=>setPost('successfully deleted'))
  }


  return (
    <BlogContainer>
    <BlogRow>
        <BlogCategory>{tag}</BlogCategory>
      <BlogData>
        <BlogContent>Title: {title}</BlogContent>
        <BlogContent>Body: {content}</BlogContent>
        <BlogDelete onClick={deletePost}>Delete</BlogDelete>
      </BlogData>
    </BlogRow>
  </BlogContainer>
  )
}

export default Blog
