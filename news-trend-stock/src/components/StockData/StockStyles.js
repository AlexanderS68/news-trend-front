import styled from "styled-components"


export const StockDelete = styled.button`
  width: 30%;
  font-size: 18px;
  color: red;
  background-color: transparent;
  box-shadow: 4px 4px 2px #333;
  margin-right: 70px;
  border-radius: 4px;
  border: 0.5px solid black;
  `

export const StockContainer = styled.div`
  display:flex;
  justify-content: center;
  z-index: 15;
`

export const StockRow = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
  height: 80px;
  
  width: 1200px;
  box-shadow: 2px 4px 6px #333;
`
export const Stock = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;
  min-width: 300px;

  && h1 {
    font-size: 20px;
    width:150px;
    padding: 5px 15px 0 10px;
  }
`
export const Symbol = styled.p`
  text-transform: uppercase;;
`
export const StockData = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  
  `
export const BidPrice = styled.p`
  width: 130px;
  padding-right: 10px;
  color: black;
  font-weight: 900;
`
export const Volume = styled.p`
  width: 155px;
  padding: 0px 50px;
  font-weight: 900;
`
export const StockItem = styled.p`
width: 155px;
padding:0px 10px;
font-weight: 900;
`
export const WatchList = styled.button`
  cursor: pointer;
  width:150px;
  // background: transparent;
  font-size: medium;
  border: 2px solid black;
`

export const StockGreen = styled.p`
  color: green;
  font-weight: 900;
`
export const StockRed = styled.p`
  color: red;
  font-weight: 900;
`
