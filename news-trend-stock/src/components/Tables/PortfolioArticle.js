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
//change parameter names
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, 'War', 'Forbes', 'Tupelo, MS', 'VISA ⠀•••• 3719', '15 Mar, 2019'),
  createData(1, 'Article ', 'NPR', 'London, UK', 'VISA ⠀•••• 2574', '15 Mar, 2019'),
  createData(2, 'Article ', 'CNN', 'Boston, MA', 'MC ⠀•••• 1253', '15 Mar, 2019'),
  createData(3, 'Article ', 'Fox', 'Gary, IN', 'AMEX ⠀•••• 2000', '15 Mar, 2019'),
  createData(4, '15 Mar, 2019', 'The Onion', 'Long Branch, NJ', 'VISA ⠀•••• 5919', '15 Mar, 2019'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function PortfolioArticles() {
  const [userDelete, setUserDelete] = useState('')
  
  const deleteArticle = (articleId) => {
    return fetch(`http://localhost:8000/portfolio/${articleId}/`, {
      method: 'DELETE' 
    }).then(res=>setUserDelete('successfully deleted'))
    .then(res=>setUserDelete('successfully deleted'))
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Published Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell onClick={()=>deleteArticle(row.id)}>Delete</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more [category] Articles
        </Link>
      </div>
    </React.Fragment>
  );
}