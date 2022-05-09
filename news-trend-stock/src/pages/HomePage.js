import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TrendingCategoriesList from '../components/Tables/TrendingCategoriesList';
import TrendingClustersList from '../components/Tables/TrendingClustersList';
import Navbar from '../components/Navbar';
import TrendyChart from '../components/Charts/TrendyChart'
import TrendingCategories from '../components/Tables/TrendingCategories';
import { CategoryScale } from 'chart.js';
import TrendingStocks from '../components/TrendingStocks/TrendingStocks';



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
    // backgroundColor: "rgba(255,192,192,0.2)",
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 370,
  },
}));




const Dashboard = () => { 
  let TrendCategories = []
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [articles, setArticles] = useState([])
  const [categorys, setCategorys] = useState([])
  const [clusters, setClusters] = useState('')
  const [trending, setTrending] = useState([])


  
  const BASE_URL = `http://localhost:8000/`
  const TRENDING = `https://api.tdameritrade.com/v1/marketdata/$SPX.X/movers?apikey=9MPYNAFHT088WTRKTY6NXJAKJLDIDSG8&direction=up&change=percent`


  useEffect(() => {
    fetch(`${BASE_URL}articles/`,{
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${token}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setArticles(data)
      // console.log("Articles Request", data)
      })
      
      
      fetch(`${BASE_URL}category/`,{
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${token}`
      }})
    .then(res=>res.json())
    .then(data=>{
      setCategorys(data)
      // console.log("Chart Volume Request", data)
      })
      


        fetch(`${TRENDING}`)
        .then(res=>res.json())
        .then(data=>{
          setTrending(data)
          })
          


            fetch(`${BASE_URL}clusters/`,{
              headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${token}`
              }})
            .then(res=>res.json())
            .then(data=>{
              setClusters(data)
              // console.log("Articles Request", data)
              })
              
  }, [])




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

    const renderTrendyChart = () => {

      let myArr = []
      let labelsHolder = []

      const data = {
        labels: labelsHolder,
        datasets: []
      }
      let chartData = {
        labels: labelsHolder,
        datasets: []
      }
      const hisData = {
        labels: labelsHolder,
        datasets: []
      }


      if (categorys.length == 0) {
        return null
      }

      else if (categorys.length != 0) {

        // Historical Trend Line
        // Add Categories to category list
        let categoryListHis= []
        let categoryList= []
        for (let i = 0; i < categorys.length; i++){
          if (categoryList.includes(categorys[i].category_name)){
            let x = 0
          }else if (!categorys[i].category_name.includes("_")){
            categoryListHis.push(categorys[i].category_name+"_His")
            hisData.datasets.push({
              label: categorys[i].category_name + "_His",
              data: [],
              fill: true,
              backgroundColor: "rgba(255,192,192,0.2)",
              borderColor: "rgba(255,192,192,1)"
            })
            categoryList.push(categorys[i].category_name)      
            data.datasets.push({
              label: categorys[i].category_name,
              data: [],
              fill: true,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderColor: "rgba(75,192,192,1)"
            })
          }
        }

        for (let i = 0; i < data.datasets.length; i++){

          for (let j = 0; j < categorys.length; j++){
            if (categorys[j].category_name == categoryList[i]){
              if (i==0){
                myArr=(categorys[j].published_at.split(" "))
                labelsHolder.push(myArr[0])
              }
              data.datasets[i].data.push(categorys[j].count)

            }
          }
          
        }data.labels = labelsHolder
        console.log("data", data)
        let week_1 = 0
      let week_2 = 0
      let week_3 = 0
      let week_4 = 0
      let week_5 = 0
      let week_6 = 0
      
      for (let i = 0; i < hisData.datasets.length; i++){
        let tempHisDataDatasetsData= []
        for (let j = 0; j < categorys.length; j++){
          if (categorys[j].category_name == categoryListHis[i]){
            hisData.datasets[i].data.push(categorys[j].count)
          }
        }
        
        for (let k = hisData.datasets[i].data.length-1; k > (hisData.datasets[i].data.length)-8; k--){
          week_1 = parseInt(hisData.datasets[i].data[k-7])
          week_2 = parseInt(hisData.datasets[i].data[k-14])
          week_3 = parseInt(hisData.datasets[i].data[k-21])
          week_4 = parseInt(hisData.datasets[i].data[k-28])
          week_5 = parseInt(hisData.datasets[i].data[k-35])
          week_6 = parseInt(hisData.datasets[i].data[k-42])
          let TempDayAverage = (week_1+week_2+week_3+week_4+week_5+week_6)/6

          tempHisDataDatasetsData.push(TempDayAverage)
     
        }hisData.datasets[i].data = tempHisDataDatasetsData.reverse()
      }
      
      let trendRankingArray = []
      let trendRanking = {}
  
      for (let i = 0; i < hisData.datasets.length; i++){
        let dataDifference = []
        for (let j = 0; j < hisData.datasets[i].data.length; j++){

          dataDifference.push((parseInt(data.datasets[i].data[j])-hisData.datasets[i].data[j]))
          
        }data.datasets[i].data = dataDifference
        
        let dataDifferenceSum = dataDifference.reduce((a, b) => a + b, 0)
        // console.log("dataDifference", data.datasets[i].label,dataDifferenceSum, dataDifference)
        trendRanking[data.datasets[i].label] = dataDifferenceSum
        
        trendRankingArray.push(dataDifferenceSum)
        trendRankingArray.sort((a, b) => (a - b));
        trendRankingArray.reverse()
          
      }
      // console.log("dataDiff Sum", trendRanking, trendRankingArray, chartData, data )
   
      let chartColors = ["rgba(50, 180, 110,1)","rgba(120, 211, 67,1)","rgba(197, 211, 67,1)","rgba(211, 165, 96,1)"]
      for (let i = 0; i < 4; i++){
        for(let j = 0; j < categoryList.length; j++){ 
          // console.log("Trend Ranking Array",categoryList[j], parseInt(trendRanking[categoryList[j]]), parseInt(trendRankingArray[i]))
          if (parseInt(trendRanking[categoryList[j]]) == parseInt(trendRankingArray[i])){
            for (let k = 0; k < data.datasets.length; k++){
              // console.log(data.datasets.length, k)
              if (data.datasets[k].label == categoryList[j]){
                TrendCategories.push(data.datasets[k].label)
                data.datasets[k].borderColor = chartColors[i]
                chartData.datasets.push(data.datasets[k])
              }
            }
          }
          // chartData.data.push()
        }

      }



      return <TrendyChart chartData = { chartData }/>
    }
  }

  const renderTrendingArticlesList = () => {
    let renderedArticles=[]
    let unsortedRenderedArticles=[]
    if (articles.length != 0) {
      // console.log ("success", articles)
      let i =0
      let j = 0
      let k = 0

          while (k<articles.length){
            
            if ((articles[k].description===TrendCategories[0])||
              (articles[k].description===TrendCategories[1])||
              (articles[k].description===TrendCategories[2])||
              (articles[k].description===TrendCategories[3])||
              (articles[k].description===TrendCategories[4])||
              (articles[k].description===TrendCategories[5])||
              (articles[k].description===TrendCategories[6])){
              
              // console.log("test", articles[k].description,TrendCategories[j])
              unsortedRenderedArticles.push(articles[k])
             
            }k++
          }
          let jHolder=0
          let excludedArticles=[]

          for (let i = 0; i<5;i++){

            
            for (let j = 0; j<TrendCategories.length;j++){  

              
                for (let k = 0; k<unsortedRenderedArticles.length;k++){ 
                  if(!excludedArticles.includes(k) && (unsortedRenderedArticles[k].description == TrendCategories[j])){
                    renderedArticles.push(unsortedRenderedArticles[k])
                    excludedArticles.push(k)
                    break
            
                    
                  }
              }
            }
          }
   

      return <TrendingCategoriesList renderedArticles = { renderedArticles } />
    }
  }
  const renderTrendingClustersList = () => {
    let renderedClusters=[]
    if (clusters.length != 0) {
        renderedClusters=clusters
      return <TrendingClustersList renderedClusters = { renderedClusters } />
    }
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                {/* <TrendyChart data = {data} /> */}
                {renderTrendyChart()}
              </Paper>
            </Grid>

            {/* Todays Trendz */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <h2>Todays Treding</h2>
                {renderTrendingStocks()}
              </Paper>
            </Grid>
            {/* Articles */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={classes.paper}>
                {renderTrendingArticlesList()}
                
              </Paper>
            </Grid>
            {/* Articles */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={classes.paper}>
                {renderTrendingClustersList()}
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

export default Dashboard