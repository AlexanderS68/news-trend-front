import React from 'react'
import {
ArticleContainer,ArticleRow,ArticleImage,
ArticleData,Favorite,
ArticleDelete,ArticleItem,ArticleUrl, TempContainer,
} from './ArticleStyles'
import { useState } from 'react';
import parseJwt from '../../api/UserCheck';

const Articles = ({renderDeleteButton, articleId, author, title, publishedAt, url, urlToImage}) => {
const [userDelete, setUserDelete] = useState('')

  const deleteArticle = () => {
    return fetch(`http://localhost:8000/portfolio/${articleId}/`, {
      method: 'DELETE' 
    }).then(res=>setUserDelete('successfully deleted'))
    .then(res=>setUserDelete('successfully deleted'))
  }
          
  const setArticle = () => {
    let token = localStorage.getItem("access_token")
    let userId = parseJwt(token)
    return fetch('http://localhost:8000/portfolio/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "user": [userId.user_id],
          "publishedAt": publishedAt,
          "author": author,
          "url": url,
          "title": title,
          "urlToImage": urlToImage,
      })
    })
  }
  return (
      <ArticleContainer>
        <ArticleRow>
          <ArticleData>
          {renderDeleteButton
            ?
            <ArticleDelete onClick={deleteArticle}>Delete</ArticleDelete>
            :
            <Favorite onClick={setArticle}>Fav</Favorite>
          }
          
            <ArticleImage src={urlToImage}></ArticleImage>
            <ArticleItem>{title}</ArticleItem>
            {/* <ArticleItem>Date:{publishedAt}</ArticleItem> */}
            <ArticleItem>Author: {author}</ArticleItem>
            <ArticleUrl href={url}>Read full article</ArticleUrl>
          </ArticleData>
        </ArticleRow>
      </ArticleContainer>
  )
}
export default Articles