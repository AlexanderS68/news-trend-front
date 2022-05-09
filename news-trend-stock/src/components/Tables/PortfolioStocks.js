import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { useState } from 'react';

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function TrendingCategoriesList( renderedStocks) {
  console.log("portfolio Coins COMPONENT",  renderedStocks)
  const [userDelete, setUserDelete] = useState('')

  const deleteStock = (stockId) => {
    return fetch(`http://localhost:8000/stocks/${stockId}`, {
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
            <TableCell>Volitility</TableCell>
            <TableCell>PE Ratio</TableCell>
            <TableCell>Div Amount</TableCell>
            <TableCell>Div Date</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {renderedStocks.renderedStocks.map((row) => (
            <TableRow key={row.id} >
              <TableCell onClick={()=>deleteStock(row.id)}>Delete</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.openPrice}</TableCell>
              <TableCell>{row.volatility}</TableCell>
              <TableCell>{row.peRatio}</TableCell>
              <TableCell>{row.divAmount}</TableCell>
              <TableCell>{row.divDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    </React.Fragment>
  );
}