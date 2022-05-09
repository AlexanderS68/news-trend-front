import { useEffect, useState } from 'react';
import styles from '../App.css';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../components/Navbar';
import Coins from '../components/Coins/Coin';
import Articles from '../components/Articles/Articles';
import Box from '@material-ui/core/Box';
import StockList from '../components/Tables/StockList.js'
import CryptoDataList from '../components/Tables/CryptoDataList.js'
// import CryptoDataList from '../../components/Tables/CryptoDataList.js'
import Button from '@material-ui/core/Button';
import parseJwt from '../api/UserCheck';

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

const CoinPage = () =>  {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightSearch = clsx(classes.paper, classes.fixedHeightSearch);
  const fixedHeightArticles = clsx(classes.paper, classes.fixedHeightArticles);
  const fixedWidthSearch= clsx(classes.stock_search);
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [trending, setTrending] = useState([])
  const [articles, setArticles] = useState([])

  const BASE_URL = `https://api.nomics.com/v1/currencies/ticker?key=5bd373c2576ec752da4e6f6a68cf6163e3681470&ids=${search}&interval=1d,30d&convert=USD&per-page=100&page=1`

  const Article_url = `https://newsapi.org/v2/everything?q=${search}&apiKey=0ab30083f5d043759d6d5d51d5c86863`

  const TRENDING = `https://api.nomics.com/v1/currencies/ticker?key=5bd373c2576ec752da4e6f6a68cf6163e3681470&ids=BTC,ETH,ADA&interval=1d,30d&convert=USD&per-page=100&page=1`

    useEffect(() => {
          fetch(`${BASE_URL}`)
          .then(res=>res.json())
          .then(data=>{
            setCoins(data[0])
          })
        },[search])

    useEffect(() => {
          fetch(`${Article_url}`)
          .then(res=>res.json())
          .then(data=>{
            setArticles(data.articles)
          })
        },[search])

    useEffect(() => {
          fetch(`${TRENDING}`)
          .then(res=>res.json())
          .then(data=>{
            setTrending(data)
            })
        },[search])
      
    
        const handleSubmit = (evt) => {
          evt.preventDefault()
          setSearch(evt.target[0].value.toUpperCase())
        }

    
        const renderArticles = () => {

          let stockData = {
            "symbol": "Cryptocurrency"
          }
          let renderedArticles = articles
          console.log("articles", articles)
          if (renderedArticles) {
            
            return <StockList renderedArticles = {renderedArticles} stockData = {stockData}/>
          }
        }
        const setCoinData = () => {
  
          let coinData = coins
          
          

          if (coinData) {
            console.log("test",coinData.market_cap)
            let token = localStorage.getItem("access_token")
            let userId = parseJwt(token)
            return fetch('http://localhost:8000/coin/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  "user": [userId.user_id],
                  "name": `${coinData.name}`,
                  "price": `${coinData.price}`,
                  "volume": `${coinData["1d"].volume}`,
                  "max_supply": `${coinData.circulating_supply}`,
                  "market_cap": `${coinData.market_cap}`,

              })
            })

          }
          
          
        };

        const renderTheClassics = () => {
            return trending.map( (coin) => {
            return (
              <Coins
              symbol={coin.symbol}
              logo={coin.logo_url}
              price={coin.price}
              max_supply={coin.max_supply}
              market_cap={coin.market_cap}
              />
            )})
        }
      
          // const renderCoinData = ()=>{
          //         return (
          //               <Coins
          //               name={coins.name}
          //               symbol={coins.symbol}
          //               logo={coins.logo_url}
          //               watchlistButton={coins.id}
          //               price={coins.price}
          //               max_supply={coins.max_supply}
          //               market_cap={coins.market_cap}
          //               />
          //           )
          //       }

          const renderCryptoData = () => {
            console.log("coins", coins)

            let cryptoData = coins
            
            
  
            if (cryptoData) {
  
              return <CryptoDataList cryptoData = {cryptoData}/>
            }else{
              let cryptoData = {
              "name": "N/A",
              "symbol": "N/A",
              "logo_url": "N/A",
              "id": "N/A",
              "max_supply": "N/A",
              "market_cap": "N/A",
            
   
            }
              // console.log("test", blankStockData)
              return <CryptoDataList cryptoData = {cryptoData}/>
            }
            
          }
                  
  return (


    <div className={classes.root}>
    <Navbar />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container} >
        <Grid container spacing={3}>
      
          <Grid container spacing={3} item xs={12} md={8} lg={9}>
            <Grid container spacing={3} item xs={12} md={8} lg={12}>
              <Grid item xs={4.8} md={5} lg={4}>
                <Paper className={fixedHeightSearch}>
                <div >
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
                  <Button variant="contained" color="primary" onClick={setCoinData}>Add To Watchlist</Button>
                </Paper>
                
              </Grid>
              <Grid item xs={7} md={3} lg={8}>
                <Paper className={fixedHeightSearch}>
                {/* {renderCoinData()} */}
                {renderCryptoData()}
                </Paper>
              </Grid>
              
            </Grid>

            <Grid item xs={4} md={6} lg={12}>
              <Paper className={fixedHeightArticles}>

                {renderArticles()}
              </Paper>
            </Grid>
          </Grid>

    
          <Grid item xs={5} md={7} lg={3}>
            <Paper className={fixedHeightPaper}>
              <h2>The Classics</h2>
              {renderTheClassics()}
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

export default CoinPage