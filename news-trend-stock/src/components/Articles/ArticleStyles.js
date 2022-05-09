import styled from "styled-components"


export const ArticleUrl = styled.a`
  width: 155px;
  text-decoration: none;
  font-size: 16px;
  `

export const ArticleDelete = styled.button`
width: 10%;
font-size: 20px;
color: red;
background-color: rgba(255,255,255,0.1);
border: none;
margin-left: 20px;
box-shadow: 4px 4px 2px #000;
border-radius: 4px;
`
// parent / reversed
export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;

`

export const ArticleRow = styled.div`
  border-bottom: 2px black solid;
  width: auto;
  box-shadow: 8px 3px 8px #333;
`

export const ArticleData = styled.div`
  display: flex;
  align-items: center;
  
  `
export const ArticleImage = styled.img`
  margin: 5% 20px;
  height: 60px;
  width: auto;
  
`

export const ArticleItem = styled.p`
  font-size: 16px;
  font-weight: 900;
  display: flex;
  align-item: column;
  justify-content: center;
  padding: 10px;

`
export const Favorite = styled.button`
  cursor: pointer;
  height: 2rem;
`
