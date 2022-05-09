import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HomeIcon from '@material-ui/icons/Home';
import { Link, Redirect } from 'react-router-dom';
import axiosInstance from '../axios';
import { useHistory } from 'react-router';

export const mainListItems = (
  <div>

      <ListItem button component={Link} to={'/home'}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>


      <ListItem button component={Link} to={'/category'}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      
      <ListItem button component={Link} to={'/stock'}>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Stocks" />
      </ListItem>

      <ListItem button component={Link} to={'/coin'}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Coins" />
      </ListItem>

      <ListItem button component={Link} to={'/portfolio'}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </ListItem>

      <ListItem button component={Link} to={'/blog'}>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>

  </div>
);


const handleLogout = () => {
  const response = axiosInstance.post('users/logout/blacklist/', {
    refresh_token: localStorage.getItem('refresh_token'),
  });
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  axiosInstance.defaults.headers['Authorization'] = null;
};


export const secondaryListItems = (

  <div>
    <ListItem button component={Link} to={'/signin'} onClick={handleLogout}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);