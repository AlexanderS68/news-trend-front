import React from 'react'
import {
StockContainer,StockRow,Stock,
StockData,Volume,BidPrice,
StockGreen,StockRed,WatchList,
StockItem,StockDelete,
} from './StockStyles'
import { useState } from 'react';
import parseJwt from '../../api/UserCheck';

const Stocks = ({renderDeleteButton, stockId, name, bidPrice, totalVolume, 
  openPrice, closePrice, mark, volatility, peRatio, divAmount, divDate, 
  markPercentChangeInDouble}) => {

    const [userDelete, setUserDelete] = useState('')

    const deleteStock = () => {
      return fetch(`http://localhost:8000/stocks/${stockId}`, {
        method: 'DELETE' 
      }).then(res=>setUserDelete('successfully deleted'))
      .then(res=>setUserDelete('successfully deleted'))
    }
          const setStockData = () => {
            let token = localStorage.getItem("access_token")
            let userId = parseJwt(token)
            return fetch('http://localhost:8000/stocks/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  "name": `${name}`,
                  "user": [userId.user_id],
                  "bidPrice": `${bidPrice}`,
                  "totalVolume": `${totalVolume}`,
                  "openPrice": `${openPrice}`,
                  "closePrice": `${closePrice}`,
                  "mark": `${mark}`,
                  "volatility": `${volatility}`,
                  "markPercentChangInDouble": `${markPercentChangeInDouble}`,
              })
            })
          };
          
  return (
      <StockContainer>
        <StockRow>
          <Stock>
            <h1>{name.toUpperCase()}</h1>
            {renderDeleteButton
            ?
            <StockDelete onClick={deleteStock}>Delete</StockDelete>
            :
            <WatchList onClick={setStockData} >ADD TO WATCHLIST!</WatchList>
            }
          </Stock>
          <StockData>
            <BidPrice>Bid Price: ${bidPrice}</BidPrice>
            <Volume>Volume: {totalVolume}</Volume>
            <StockItem>Open Price: ${openPrice}</StockItem>
            <StockItem>Close Price: ${closePrice}</StockItem>
            <StockItem>Volatility: {volatility}</StockItem>
            {markPercentChangeInDouble < 0 
            ? 
            <StockRed>Percent Change %{markPercentChangeInDouble.toFixed(2)}</StockRed>
            : 
            markPercentChangeInDouble > 0 &&
            <StockGreen>Percent Change %{markPercentChangeInDouble}</StockGreen>
            }
          </StockData>
        </StockRow>
      </StockContainer>
  )
}
export default Stocks