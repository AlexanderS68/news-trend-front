import { useEffect, useState } from 'react';
import styles from '../../App.css';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Navbar from '../../components/Navbar';
import Stocks from '../../components/StockData/StockData';
import TrendingStocks from '../../components/TrendingStocks/TrendingStocks';
import Articles from '../../components/Articles/Articles';
import { Filter } from '@material-ui/icons';
import StockList from '../../components/Tables/StockList.js'

import StockDataList from '../../components/Tables/StockDataList.js'
import Box from '@material-ui/core/Box';
import { blue } from '@material-ui/core/colors';

import parseJwt from '../../api/UserCheck';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
  },
  paper: {
    padding: theme.spacing(2),
    // backgroundColor: "rgba(255,192,192,1)",
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 600,
  },
  fixedHeightSearch: {
    alignItems: 'center',
    height: 270,
  },
  fixedHeightArticles: {
    height: 500,
  },
  stock_search: {
    
   width: 1,
  },
}));

const StockPage = () =>  {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightSearch = clsx(classes.paper, classes.fixedHeightSearch);
  const fixedHeightArticles = clsx(classes.paper, classes.fixedHeightArticles);
  const fixedWidthSearch= clsx(classes.stock_search);
  const [stocks, setStocks] = useState([])
  const [search, setSearch] = useState('')
  const [trending, setTrending] = useState([])
  const [articles, setArticles] = useState([])
  const [userDelete, setUserDelete] = useState('')

  const BASE_URL = `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=9MPYNAFHT088WTRKTY6NXJAKJLDIDSG8&symbol=${search}`

  const Article_url = `https://newsapi.org/v2/everything?q=${search}&apiKey=8fabe57cc05f460ca83b046c79346721`

  const TRENDING = `https://api.tdameritrade.com/v1/marketdata/$SPX.X/movers?apikey=9MPYNAFHT088WTRKTY6NXJAKJLDIDSG8&direction=up&change=percent`

    useEffect(() => {
          fetch(`${BASE_URL}`)
          .then(res=>res.json())
          .then(data=>{
            setStocks(data)
          })
          
        },[search])

    useEffect(() => {
          fetch(`${Article_url}`)
          .then(res=>res.json())
          .then(data=>{
            setArticles(data.articles)
          })
          console.log("returnedArticles", articles)
        },[search])

    useEffect(() => {
          fetch(`${TRENDING}`)
          .then(res=>res.json())
          .then(data=>{
            setTrending(data)
          })
        },[])
      
    
        const handleSubmit = (evt) => {
          evt.preventDefault()
          setSearch(evt.target[0].value)
          console.log("search", search)
        }

        const renderArticles = () => {
          let value = search.toLocaleUpperCase()
          let stockData = stocks[value]
          let renderedArticles = articles
  
          if (renderedArticles && stockData) {
            console.log("stockArticles", renderedArticles)
            // console.log("ARTICLES RETURNED", articles)


            
            return <StockList renderedArticles = {renderedArticles} stockData = {stockData}/>
          }
          
        }
        const renderStockData = () => {
          
          let value = search.toLocaleUpperCase()
          let stockData = stocks[value]
          
          

          if (stockData) {

            return <StockDataList stockData = {stockData}/>
          }else{
            let stockData = {
            "symbol": "N/A",
            "lastPrice": "N/A",
            "mark": "N/A",
            "netChange": "N/A",
            "divAmount": "N/A",
            "divYeild": "N/A",
          
            
          }
            // console.log("test", blankStockData)
            return <StockDataList stockData = {stockData}/>
          }
          
        }
        const renderTrendingStocks = () => {

            return trending.map( (stock) => {
            return (
                  <TrendingStocks
                  change={stock.change}
                  description={stock.description}
                  direction={stock.direction}
                  last={stock.last}
                  symbol={stock.symbol}
                  totalVolume={stock.totalVolume}
                  />
            )})
        }
        
        const deleteStock = () => {
          console.log("StockSymbol", stocks.symbol)
          return fetch(`http://localhost:8000/stocks/${stocks.symbol}`, {
            method: 'DELETE' 
          }).then(res=>setUserDelete('successfully deleted'))
          .then(res=>setUserDelete('successfully deleted'))
        }

        const setStockData = () => {
          let value = search.toLocaleUpperCase()
          let stockData = stocks[value]
          
          

          if (stockData) {
            console.log("test",stockData)
            let token = localStorage.getItem("access_token")
            let userId = parseJwt(token)
            return fetch('http://localhost:8000/stocks/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  "name": `${stockData.symbol}`,
                  "user": [userId.user_id],
                  "bidPrice": `${stockData.bidPrice}`,
                  "totalVolume": `${stockData.totalVolume}`,
                  "openPrice": `${stockData.openPrice}`,
                  "closePrice": `${stockData.closePrice}`,
                  "peRatio": `${stockData.peRatio}`,

                  "mark": `${stockData.mark}`,
                  "volatility": `${stockData.volatility}`,
                  "markPercentChangInDouble": `${stockData.markPercentChangeInDouble}`,
              })
            })

          }
          
          
        };
        
      
          // const renderSearchBar = ()=>{
          //   if (searchedTicker) {

          //     return <StockDataList stockData = {stockData}/>
          //   }
          // }
                  
  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} >
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid container spacing={3} item xs={12} md={8} lg={9}>
              <Grid container spacing={3} item xs={12} md={8} lg={12}>
                <Grid item xs={4.8} md={5} lg={4}>
                  <Paper className={fixedHeightSearch}>
                  <div >
                      {/* SEARCH */}
                      <form onSubmit={handleSubmit} >
                        <input
                        
                        style={{width: "155px"}}
                        type='text'
                        placeholder='Search A stock'
                        className='stock-input'
                        ></input>
                      <button type='submit' className="hidden"></button>
                      </form>
                      
                      
                    </div>
                    <Button variant="contained" color="primary" onClick={setStockData}>Add To Watchlist</Button>
                  </Paper>
                </Grid>
                <Grid item xs={7} md={3} lg={8}>
                  <Paper className={fixedHeightSearch}>
                  {renderStockData()}
                  </Paper>
                </Grid>
                
              </Grid>
              {/* Articles */}
              <Grid item xs={4} md={6} lg={12}>
                <Paper className={fixedHeightArticles}>
                  
                  {renderArticles()}
                </Paper>
              </Grid>
            </Grid>

            {/* Todays Trendz */}
            <Grid item xs={5} md={7} lg={3}>
              <Paper className={fixedHeightPaper}>
                <h2>Today's Movers</h2>
                {renderTrendingStocks()}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
 
  );
}

export default StockPage