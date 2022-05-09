import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Stocks from '../components/StockData/StockData';
import PortfolioCoins from '../components/Tables/PortfolioCoins';
import PortfolioStocks from '../components/Tables/PortfolioStocks';
import Articles from '../components/Articles/Articles';
import parseJwt from '../api/UserCheck';
import Coins from '../components/Coins/Coin';
import Box from '@material-ui/core/Box';
import { Filter } from '@material-ui/icons';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import styles from '../App.css';
import { green } from '@material-ui/core/colors';
import PortfolioArticles from '../components/Tables/PortfolioArticle';


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
    display: 'grid',
    overflow: 'auto',
    
  },
  
  paper: {
    padding: theme.spacing(2),
    direction: 'row',
    display: 'grid',
    overflow: 'auto',
    boxShadow: '6px 4px 3px #333'
  },
  fixedHeight: {
    height: 400
  },
  bottom: {
    width: '1100px',
    height: '500px',
    overflow: 'auto',
    
  }
}));

const PorfolioPage = () => {
  const classes = useStyles();
  const [userArticles, setUserArticles] = useState([])
  const bottom = clsx(classes.bottom);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userStocks, setUserStocks] = useState([])
  const [userCoins, setUserCoins] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/stocks/")
    .then(res=>res.json())
    .then(data=> {
      console.log('stock data',data)
      setUserStocks(data)})
  },[]);

  useEffect(() => {
    fetch("http://localhost:8000/portfolio/")
    .then(res=>res.json())
    .then(data=>{
      console.log('article', data)
      setUserArticles(data)})
    },[]);

    useEffect(() => {
      fetch("http://localhost:8000/coin/")
      .then(res=>res.json())
      .then(data=>{
        console.log('data', data)
        setUserCoins(data)})
      },[]);
    
    
  // const renderStockData = userStocks.map(stock => {
  //   let token = localStorage.getItem('access_token')
  //   let userId = parseJwt(token)
  //   if (stock.user == userId.user_id) {
  //     return (
  //           <Stocks className='stock-data'
  //           stockId={stock.id}
  //           name={stock.name}
  //           renderDeleteButton={stock.name}
  //           bidPrice={stock.bidPrice}
  //           totalVolume={stock.totalVolume}
  //           priceChange={stock.priceChange}
  //           openPrice={stock.openPrice}
  //           closePrice={stock.closePrice}
  //           volatility={stock.volatility}
  //           markPercentChangeInDouble={stock.markPercentChangeInDouble}
  //           />
  //         )}
  //       })

        // const renderArticleData = userArticles.map( article => {
        //   let token = localStorage.getItem(`access_token`)
        //   let userId = parseJwt(token)
        //   if (article.user == userId.user_id) {
        //     return (
        //           <Articles
        //           publushedAt={article.publushedAt}
        //           author={article.author}
        //           url={article.url}
        //           title={article.title}
        //           urlToImage={article.urlToImage}
        //           articleId={article.id}
        //           renderDeleteButton={article.id}
        //           />
        //         )}
        //     })
        const renderStockData = () => {
          let token = localStorage.getItem(`access_token`)
          let userId = parseJwt(token)
          let renderedStocks = []
          
          for (let i=0; i< userStocks.length;i++){

            if (userStocks[i].user == userId.user_id){
              renderedStocks.push(userStocks[i])
            }
          }
          
          console.log("renderedStocks",renderedStocks)

          if (renderedStocks) {
            return <PortfolioStocks renderedStocks = {renderedStocks} deleteButton={true}/>
          }
        }


            const renderCoinData = () => {
              let token = localStorage.getItem(`access_token`)
              let userId = parseJwt(token)
              let renderedCoins = []
              
              for (let i=0; i< userCoins.length;i++){

                if (userCoins[i].user == userId.user_id){
                  renderedCoins.push(userCoins[i])
                }
              }
              
              console.log("renderedCoins",renderedCoins)
    
              if (renderedCoins) {
                return <PortfolioCoins renderedCoins = {renderedCoins} deleteButton={true}/>
              }
            }

            const renderArticleData = () => {
              let token = localStorage.getItem(`access_token`)
              let userId = parseJwt(token)
              let renderedArticles = []
              
              for (let i=0; i< userArticles.length;i++){

                if (userCoins[i].user == userId.user_id){
                  renderedArticles.push(userArticles[i])
                }
              }
              
              console.log("renderedArticles",renderedArticles)
    
              if (renderedCoins) {
                return <PortfolioArticles renderedArticles = {renderedArticles} deleteButton={true}/>
              }
            }

            // const renderCoinData = userCoins.map( coin => {
            //   let token = localStorage.getItem('access_token')
            //   let userId = parseJwt(token)
            //   if (coin.user == userId.user_id) {
            //     return (
            //         <Coins
            //           name={coin.name}
            //           price={coin.price}
            //           max_supply={coin.max_supply}
            //           market_cap={coin.market_cap} 
            //           coinId={coin.id}
            //           logo={coin.logo}
            //           symbol={coin.symbol}>
            //           </Coins>
            //         )}
            //     })

  return (
    // <div>
    //   <h1>hello</h1>
    // </div>
    // <div className={classes.root}>
    //   <Navbar />
    //   <main className={classes.content}>
    //     <div className={classes.appBarSpacer} />
    //     <Container maxWidth="lg" className={classes.container}>
    //       <Grid container spacing={3}>
    //         {/* Chart */}
    //         <Grid item xs={12} md={8} lg={9}>
    //           <Paper className={fixedHeightPaper}>
    //             {/* <Chart /> */}
    //             {/* <TrendyChart data = {data} /> */}
    //             {renderTrendyChart()}
    //           </Paper>
    //         </Grid>

    //         {/* Todays Trendz */}
    //         <Grid item xs={12} md={4} lg={3}>
    //           <Paper className={fixedHeightPaper}>
    //             <h2>Todays Treding</h2>
    //             {renderTrendingStocks()}
    //           </Paper>
    //         </Grid>
    //         {/* Articles */}
    //         <Grid item xs={12} md={4} lg={6}>
    //           <Paper className={classes.paper}>
    //             {/* {renderTrendingArticlesList()} */}
                
    //           </Paper>
    //         </Grid>
    //         {/* Articles */}
    //         <Grid item xs={12} md={4} lg={6}>
    //           <Paper className={classes.paper}>
    //             {/* {renderTrendingClustersList()} */}
    //           </Paper>
    //         </Grid>
    //       </Grid>
    //       <Box pt={4}>
    //       </Box>
    //     </Container>
    //   </main>
    // </div>
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container direction={'row'} spacing={6}>
            <Grid item xs={8} md={8} lg={6}>
              <Paper className={fixedHeightPaper}>               
                <h1 className='stock-text-p'>Watchlist</h1>  
                  {renderStockData()}              
              </Paper>          
            </Grid>          
          

          <Grid item xs={8} md={8} lg={6}>
            <Paper className={fixedHeightPaper}> 
            <h1 className='cryptoHeader'>Crypto</h1>             
              {renderCoinData()}
            </Paper>          
          </Grid>    
          </Grid>

          <Grid  className='parentTwo' spacing={3}>
            <Grid item xs={8} md={8} lg={6}>
              <Paper className={classes.bottom}> 
                  {renderArticleData()}
                </Paper>
              </Grid>
            </Grid>
            
        </Container>
      </main>
    </div>
  );
}

export default PorfolioPage