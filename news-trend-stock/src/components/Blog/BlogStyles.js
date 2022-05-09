import styled from "styled-components";

export const BlogContainer = styled.div`
  display:flex;
  justify-content: center;
  z-index: 15;
  
`

export const BlogRow = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #000;

  width: 990px;
`
export const Blog = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;
  min-width: 300px;

  && h1 {
    font-size: 16px;
    width:150px;
  }
`
export const BlogCategory = styled.p`
  text-transform: uppercase;;
  
` 
export const BlogData = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  `
export const BlogContent = styled.p`
  width: 130px;
  
`
export const BlogDelete = styled.button`
  width: 155px;
  margin-top: 15px;
  text-shadow: 2px 2px 2px #333;
  height: 40px;
  color:white;
  background-color: red;
  `

