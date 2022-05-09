import React from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Navbar from '../components/Navbar';
import TrendyChart from '../components/Charts/TrendyChart'
import TrendingCategoriesList from '../components/Tables/TrendingCategoriesList';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../App.css';



// import TrendyChart from '../components/Charts/TrendyChart';


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
    height: 400,
  },
  searchHeight: {
    alignItems: 'center',
    height:60,
  },
}));

const handleSubmit = (evt) => {
    evt.preventDefault()

}

let menuAnal = {}
let chartData = {}

export default function Dashboard() {

  

  const classes = useStyles(); 
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const searchHeightPaper = clsx(classes.paper, classes.searchHeight);
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState([])
  const [categorys, setCategorys] = useState([])

  

  const BASE_URL = `http://localhost:8000/`

    useEffect(() => {
      fetch(`${BASE_URL}articles/`,{
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `JWT ${token}`
        }})
      .then(res=>res.json())
      .then(data=>{
        setArticles(data)
        console.log("Articles Request", data)
        })
        .catch(error=>alert(error))
    }, [])



    useEffect(() => {
      fetch(`${BASE_URL}category/`,{
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `JWT ${token}`
        }})
      .then(res=>res.json())
      .then(data=>{
        setCategorys(data)
        console.log("Category Volume Request", data)
        })
        .catch(error=>alert(error))
    }, [])

    const renderTrendingArticlesList = () => {
      let renderedArticles=[]
      if (articles.length != 0) {
        if(category.length !=0){
          for(let i = 0; i<articles.length; i++){
            if(articles[i].description == category){
              renderedArticles.push(articles[i])
            }
          }
        }else{
          renderedArticles=articles
        }
        return <TrendingCategoriesList renderedArticles = { renderedArticles } />

      }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (selectedCategory) => {
      
        setCategory(selectedCategory);
        setAnchorEl(null); 
    }; 
    let labelsHolder = [] 
    const data = {
      labels: labelsHolder,
      datasets: []
    }
    
    const renderTrendyChart = () => {

      let myArr = []
      const hisData = {
        labels: labelsHolder,
        datasets: []
      }

      if (categorys.length == 0) {
        return null
      }

      else if (categorys.length != 0) {

        // Historical Trend Line
        let categoryListHis= []
        for (let i = 0; i < categorys.length; i++){
          if (categoryListHis.includes(categorys[i].category_name)){
            let x = 0
          }else if (categorys[i].category_name.includes("_")){
            categoryListHis.push(categorys[i].category_name)      
            hisData.datasets.push({
              label: categorys[i].category_name,
              data: [],
              fill: true,
              backgroundColor: "rgba(255,192,192,0.2)",
              borderColor: "rgba(255,192,192,1)"
            })
          }
        }


        // Add Categories to category list
        let categoryList= []
        for (let i = 0; i < categorys.length; i++){
          if (categoryList.includes(categorys[i].category_name)){
            let x = 0
          }else if (!categorys[i].category_name.includes("_")){
            categoryList.push(categorys[i].category_name)      
            data.datasets.push({
              label: categorys[i].category_name,
              data: [],
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
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
              data.datasets[i].data.push(parseInt(categorys[j].count))
            }
          }
          menuAnal[data.datasets[i].label] = (data.datasets[i].data).reduce((a, b) => a + b, 0)
        }
      
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
          
          for (let k= hisData.datasets[i].data.length-1; k> (hisData.datasets[i].data.length)-8; k--){
          week_1 = parseInt(hisData.datasets[i].data[k-7])
          week_2 = parseInt(hisData.datasets[i].data[k-14])
          week_3 = parseInt(hisData.datasets[i].data[k-21])
          week_4 = parseInt(hisData.datasets[i].data[k-28])
          week_5 = parseInt(hisData.datasets[i].data[k-35])
          week_6 = parseInt(hisData.datasets[i].data[k-42])
          let TempDayAverage = (week_1+week_2+week_3+week_4+week_5+week_6)/6
          tempHisDataDatasetsData.push(TempDayAverage)
          
          }
          hisData.datasets[i].data = tempHisDataDatasetsData.reverse()

        }


        if (category.length != 0){
          chartData = {
            labels: labelsHolder,
            datasets: []
          }  
          for (let i = 0; i < data.datasets.length; i++){
            if(data.datasets[i].label == category){
              chartData.datasets.push(data.datasets[i])
            }
            if (hisData.datasets[i].label.includes(category)){
              chartData.datasets.push(hisData.datasets[i])
            }

          }
          // console.log("Data passed to the Chart",chartData)
          return <TrendyChart chartData = { chartData }/>

        }
        else{
          chartData = {
            labels: labelsHolder,
            datasets: []
          }
          
          for (let i = 0 ; i<data.datasets.length ; i++){
            // console.log("TESTING", menuAnal[data.datasets[i].label])
            if (menuAnal[data.datasets[i].label] >= 50){
              chartData.datasets.push(data.datasets[i])
            }
       

          }
          // chartData=data
          return <TrendyChart chartData= { chartData }/>
        }
        
      
      }
    }



    
    const renderMenu = () => {
      // console.log("test",categoryList)
      let tempCategoryList = []
      let categoryList = []
      if (categorys.length != 0) {
        
        for (let i = 0; i < categorys.length; i++){
          if (tempCategoryList.includes(categorys[i].category_name)){
            let x = 0
          }else if (!categorys[i].category_name.includes("_")){
            tempCategoryList.push(categorys[i].category_name)      
          }
        }
      
        for (let i = 0 ; i<tempCategoryList.length ; i++){
          if (menuAnal[tempCategoryList[i]] >= 50){
            categoryList.push(tempCategoryList[i])
          }
        }categoryList.sort()
      }

        return (
            <div>
                {/* What is this for? */}
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Category
                
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                {categoryList.map((row) => (
                    <MenuItem onClick={handleClose.bind(this, row)}> {row}</MenuItem>
                    ))}
        
                </Menu>
                <a>{category}</a>
            </div>)
    }

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            
            {/* Chart */}
            <Grid item xs={12} md={8} lg={10}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                {/* <TrendyChart data = { data } /> */}
                {renderTrendyChart()}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={2}>
              <Paper className={fixedHeightPaper}>
                {renderMenu()}
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