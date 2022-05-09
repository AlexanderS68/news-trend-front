import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';

import Title from '../Title';

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function TrendingCategoriesList( renderedCoins) {
  console.log("portfolio Coins COMPONENT",  renderedCoins)
  const [userDelete, setUserDelete] = useState('')
  
  const deleteCoin = (coinId) => {
    return fetch(`http://localhost:8000/coin/${coinId}`, {
      method: 'DELETE' 
    }).then(res=>setUserDelete('successfully deleted'))
    .then(res=>setUserDelete('successfully deleted'))
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* STOCK DATA TABLE */}
      {/* ARTICLE TABLE */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Max Supply</TableCell>
            <TableCell>Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedCoins.renderedCoins.map((row) => (
            <TableRow key={row.id} >
              <TableCell onClick={()=>deleteCoin(row.id)}>Delete</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.max_supply}</TableCell>
              <TableCell>{row.market_cap}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    </React.Fragment>
  );
}