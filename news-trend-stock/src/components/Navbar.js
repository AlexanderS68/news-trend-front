import React from 'react'
// import logo from "./TILogo.jpg"
// import { MenuItems } from "./MenuItems"
// import'./Navbar.css'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import styles from '../App.css';


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

function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <img src='data:image/jpeg;base64,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' />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            The Trendy Investor
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </div>
  );
}
  

  

export default Navbar