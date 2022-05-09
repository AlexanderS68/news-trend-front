import { useEffect, useState } from 'react';
import styles from '../App.css';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../components/Navbar';
import Blog from '../components/Blog/Blog';
import parseJwt from '../api/UserCheck';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft:'15%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '100%'
  },
}));



const BlogPage = () =>  {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [posts, setPosts] = useState([])
  const [refresh, setrefresh] = useState('')

  useEffect(() => {
    let token = localStorage.getItem('access_token')
    return fetch('http://localhost:8000/blog/',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }}).then(res=>res.json())
          .then(data=>setPosts(data))
    })
  
  const renderPosts = posts.map(post=>{
    return (
        <Blog
        postId={post.id}
        title={post.title}
        content={post.content}
        category={post.tag}
        />
      )
    })

        const createPost = (evt) => {
          evt.preventDefault()
          let token = localStorage.getItem('access_token')
          let userId = parseJwt(token)
          return fetch('http://localhost:8000/blog/',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`
            },
            body: JSON.stringify({
              "title": evt.target[0].value,
              "content": evt.target[1].value,
              "tag": evt.target[2].value,
              "user": userId.user_id
            })
          }).then(res=>setrefresh('refresh posts'))
        }
                  
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={8} lg={9}>

              <Paper className={fixedHeightPaper}>
                <div className='blog'>
                  <h1 className='blog-text' >Welcome to The Trendy Blog</h1>
                  <div className='input-parent'>
                    <form onSubmit={createPost} >
                      <div className='temp-container'>
                      <input
                      type='text'
                      placeholder='Title'
                      className='title-input'
                      ></input>
                      <input
                      type='text'
                      placeholder='Enter Stock or Category'
                      className='tag-input'
                      ></input>
                      </div>
                      <div className='content-parent'>
                      <input
                      type='text'
                      placeholder='Enter Content'
                      className='content-input'
                      size='500'
                      ></input>
                    <button type='submit' className="blog-submit">Submit</button>
                    </div>
                    </form>
                    </div>
                  {renderPosts}
                </div>
              </Paper>
            </Grid>
          </Grid> 
        </Container>
      </main>
    </div>
  );
}

export default BlogPage