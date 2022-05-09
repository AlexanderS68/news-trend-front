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


export default function TrendingCategoriesList( articles) {
    console.log("STOCK ARTICLES COMPONENT", articles)
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
      {/* STOCK DATA TABLE */}
      {/* ARTICLE TABLE */}
      <h2>Portfolio Favorite Articles</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.renderedArticles.map((row) => (
            <TableRow key={row.id} >
              <TableCell onClick={()=>deleteArticle(row.id)}>Delete</TableCell>
              <TableCell><Link href={`${row.url}`}>{row.title}</Link></TableCell>
              <TableCell>{row.source.name}</TableCell>
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