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
      <h3>{articles.stockData.symbol} Stock Data</h3>


      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Last Price</TableCell>
            <TableCell>{articles.stockData.lastPrice}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>Current Price</TableCell>
              <TableCell>{articles.stockData.mark}</TableCell>
            </TableRow>
        </TableBody>
        <TableBody>
            <TableRow>
              <TableCell>Percent Change</TableCell>
              <TableCell>{articles.stockData.netChange}</TableCell>
            </TableRow>
        </TableBody>
        <TableBody>
            <TableRow>
              <TableCell>Div</TableCell>
              <TableCell>{articles.stockData.divAmount}</TableCell>
            </TableRow>
        </TableBody>
        <TableBody>
            <TableRow>
              <TableCell>Div Yeild</TableCell>
              <TableCell>{articles.stockData.divYield}</TableCell>
            </TableRow>
        </TableBody>
      </Table>

      {/* ARTICLE TABLE */}

    </React.Fragment>
  );
}