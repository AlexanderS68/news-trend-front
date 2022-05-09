import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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


export default function TrendingCategoriesList( articles) {
  console.log("STOCK Data COMPONENT", articles)

  
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* STOCK DATA TABLE */}
      <h3>{articles.cryptoData.symbol} Coin Data</h3>


      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{articles.cryptoData.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>{articles.cryptoData.rank}</TableCell>
            </TableRow>
        </TableBody>
        <TableBody>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>{articles.cryptoData.price}</TableCell>
            </TableRow>
        </TableBody>
        <TableBody>
            <TableRow>
              <TableCell>Max Supply</TableCell>
              <TableCell>{articles.cryptoData.max_supply}</TableCell>
            </TableRow>
        </TableBody>
        <TableBody>
            <TableRow>
              <TableCell>Market Cap</TableCell>
              <TableCell>{articles.cryptoData.market_cap}</TableCell>
            </TableRow>
        </TableBody>
      </Table>

      {/* ARTICLE TABLE */}

    </React.Fragment>
  );
}