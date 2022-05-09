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


export default function TrendingCategoriesList( renderedClusters ) {

  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Trending Clusters</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderedClusters.renderedClusters.map((row) => (
            <TableRow key={row.id} >
              <TableCell><Link href={`${row.url}`}>{row.title}</Link></TableCell>
              <TableCell>{row.sourceName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more [category] Clusters
        </Link>
      </div>
    </React.Fragment>
  );
}