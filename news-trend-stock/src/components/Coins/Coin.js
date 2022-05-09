import React from 'react'
import {
CoinContainer,
CoinRow,
Coin,
CoinData,
BidPrice,
WatchList,
CoinItem,
CoinDelete,
CoinImage,
} from './CoinStyles'
import { useState } from 'react';
import parseJwt from '../../api/UserCheck';

const Coins = ({name,
  watchlistButton,
  price,
  max_supply,
  market_cap, 
  coinId,
  logo,
  symbol}) => {
    const [userDelete, setUserDelete] = useState('')
      
          const setCoinData = () => {
            let token = localStorage.getItem("access_token")
            let userId = parseJwt(token)
            return fetch('http://localhost:8000/coin/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "name": `${name}`,
                "user": [userId.user_id],
                "price": `${price}`,
                "market_cap": `${market_cap}`,
                "max_supply": `${max_supply}`,
            })
            })
          }


          
  
  return (
      <CoinContainer>
        <CoinRow>
          <Coin>
            <CoinImage src={logo}></CoinImage>
            <h1>{name}</h1>
            {watchlistButton
            ?
            <WatchList onClick={setCoinData} >ADD TO WATCHLIST!</WatchList>
            :
            <CoinDelete onClick={deleteCoin}>Delete</CoinDelete>
            }
          </Coin>
          
          <CoinData>
            <CoinItem>{symbol}</CoinItem>
            <BidPrice>Price: ${price}</BidPrice>
            <CoinItem>Market Cap: {market_cap}</CoinItem>
            <CoinItem>Max Supply: {max_supply}</CoinItem>
          </CoinData>
        </CoinRow>
      </CoinContainer>
  )
}
export default Coins