import styled from "styled-components"

export const StockContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-gap: 5rem;
  justify-content: center;
`

export const StockRow = styled.div`
  border-style: solid;
  border-width:5px;
  border-color: black;
  box-sizing: border-box;
  width: 200px;
  height: auto;
  margin:5px;
  padding:5px;
`
export const Symbol = styled.p`
  text-transform: uppercase;;
`
export const StockData = styled.div`
  display: inline-block;
  `
export const StockItem = styled.p`
  justify-content: center;
`
export const StockVolume = styled.p`
  justify-content: center;
`
export const StockDirection = styled.p`
  justify-content: center;
`
export const StockName = styled.p`
  justify-content: center;
`
export const StockGreen = styled.p`
  color: green;
`
export const StockRed = styled.p`
  color: red;
`
