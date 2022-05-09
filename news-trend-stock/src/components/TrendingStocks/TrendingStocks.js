import React from 'react'
import {
StockContainer,
StockRow,
StockData,
StockVolume,
StockDirection,
StockName,
StockGreen,
StockRed,
StockItem
} from './TrendingStocksStyles'

const TrendingStocks = ({change, description, direction, last, symbol, totalVolume}) => {
  
  return (
      <StockContainer>
        <StockRow>
          <StockData>
            <h3>{symbol}</h3>
            {change < 0 ? (
            <StockRed>Percent Change %{change.toFixed(2)}</StockRed>
          ) : (<StockGreen>Percent Change %{change.toFixed(2)}</StockGreen>)
        }
            <StockItem>Price: ${last}</StockItem>
            <StockVolume>Total Volume: {totalVolume}</StockVolume>
            <StockDirection>Direction: {direction}</StockDirection>
            <StockName>Name: ${description}</StockName>
          </StockData>
        </StockRow>
      </StockContainer>
  )
}

export default TrendingStocks