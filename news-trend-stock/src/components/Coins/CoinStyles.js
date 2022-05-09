import styled from "styled-components"

export const CoinImage = styled.img`
width: 10%;
`
export const CoinDelete = styled.button`
  width: 30%;
  font-size: 18px;
  color: red;
  background-color: transparent;
  box-shadow: 4px 4px 2px #333;
  margin-right: 70px;
  border-radius: 4px;
  border: 0.5px solid black;
  `

export const CoinContainer = styled.div`
  display:flex;
  justify-content: center;
  z-index: 15;
`

export const CoinRow = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #d7d7d7;
  width: 990px;
`
export const Coin = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;
  min-width: 300px;

  && h1 {
    font-size: 16px;
    width:150px;
  }
`
export const Symbol = styled.p`
  text-transform: uppercase;;
`
export const CoinData = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;

  `
export const BidPrice = styled.p`
  width: 130px;
`
export const Volume = styled.p`
  width: 155px;
`
export const CoinItem = styled.p`
width: 155px;
`
export const WatchList = styled.button`
  cursor: pointer;
  width:150px;
  background: transparent;
  font-size: medium;
  border: none;
`

export const CoinGreen = styled.p`
  color: green;
`
export const CoinRed = styled.p`
  color: red;
`
