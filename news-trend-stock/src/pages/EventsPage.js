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
import Navbar from '../components/Navbar';
import TrendyChart from '../components/Charts/TrendyChart'
import TrendingCategories from '../components/Tables/TrendingCategories';



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
    height: 240,
  },
}));




const Dashboard = () => { 

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState('')

  
  const BASE_URL = `http://localhost:8000/articles/`

    useEffect(() => {
      fetch(`${BASE_URL}`,{
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `JWT ${token}`
        }})
      .then(res=>res.json())
      .then(data=>{
        setArticles(data)
        console.log("articles", data)
        })
        .catch(error=>alert(error))
    }, [])



    const renderTrendyChart = () => {
      const TrendyChartData = {
        labels: [],
        datasets: [],
      }
      let myArr = []
      let lineLabels = []
      let lineDescription = []
      let myVolume = {}
      let articleSort = {}
      let categoryList = []
      let tempDateSort = {}
      let datePublished = []

      let categoryData = {}
      let labelsHolder = []
      let lineData = []
      let tempLengthHolder = 0
     


      if (articles.length == 0) {
        return null
      }

      else if (articles.length != 0) {

       

        
        
        // Sort Articles by Category
        for (let i = 0; i < articles.length; i++){
          if (articles[i].description in articleSort){
            let temp = articleSort[articles[i].description]
            articleSort[articles[i].description].push(articles[i])
          }else{
            articleSort[articles[i].description]= [articles[i]]
            categoryList.push(articles[i].description)
          }
        }

        // within Each Category Sort Articles by day
        for (let i = 0; i < Object.keys(articleSort).length; i++){

            
          // console.log("TempDateSort Check",articleSort[categoryList[i]],"TempDateSort", tempDateSort )
          tempDateSort={}
          for (let j = 0; j < articleSort[categoryList[i]].length; j++){
            // At this level stepping through each category(i) and each article in that category(j)
            myArr=(articleSort[categoryList[i]][j].publishedAt).split(" ")
            // console.log(categoryList[i],myArr[0],tempDateSort)
            // console.log(`ArticleSortCategory`, categoryList[i], articleSort[categoryList[i]][j])
            if (myArr[0] in tempDateSort){
              // console.log("AdditionalArticles", tempDateSort[myArr[0]])
              tempDateSort[myArr[0]].push(articleSort[categoryList[i]][j])
            }else{
              tempDateSort[myArr[0]]= [articleSort[categoryList[i]][j]]
            }
          } articleSort[categoryList[i]] = [tempDateSort]
          }console.log("articleSort", articleSort, categoryList)



          // Setting labelsHolder equal to the category dates with the most dates
          for (let i = 0; i < Object.keys(articleSort).length-1; i++){
            if(labelsHolder.length<Object.keys(articleSort[categoryList[i]][0]).length){
              labelsHolder = Object.keys(articleSort[categoryList[i]][0])
              
            }
          }labelsHolder.sort()  

          const data = {
            labels: labelsHolder,
            datasets: []
          }

          for (let i = 0; i < Object.keys(articleSort).length; i++){
            
            // if (i != 0){
            //   data.datasets.push({
            //     label: categoryList[i-1],
            //     data: lineData,
            //     fill: true,
            //     backgroundColor: "rgba(75,192,192,0.2)",
            //     borderColor: "rgba(75,192,192,1)"
            //   })
            // }

            lineData = []
            // console.log("loop length",articleSort[categoryList[i]][0], Object.keys(articleSort[categoryList[i]][0]).length)

            for (let j = 0; j < labelsHolder.length; j++){
              // console.log(articleSort[categoryList[i]][0])
              if (labelsHolder[j] in articleSort[categoryList[i]][0]) {
                lineData.push(articleSort[categoryList[i]][0][labelsHolder[j]].length)
              }else{
                lineData.push(0)
              }
              // 
              // console.log("attempt length of each date",categoryList[i],labelsHolder[j])
            }
            data.datasets.push({
              label: categoryList[i],
              data: lineData,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)"
            })

          }
          console.log("data",data)

        
      
        return <TrendyChart data = { data }/>
      }
    
      }

    const renderTrendingArticlesList = () => {
      // console.log("length in function",articles.length)
      if (articles.length == 0) {
        // console.log ("waiting for state to update", articles)
        return null
      }
      else if (articles.length != 0) {
        // console.log ("success", articles)
        return <TrendingCategoriesList articles = { articles } />
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
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TrendingCategories />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {renderTrendingArticlesList()}
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