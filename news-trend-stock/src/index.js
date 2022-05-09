import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from "./App"
import CategoryPage from './pages/CategoryPage';
import StockPage from './pages/StockPage/StockPage';
import PortfolioPage from './pages/PortfolioPage';
import UserPage from './pages/UserPage';
import TestPage from './pages/TestPage'
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import EventsPage from './pages/EventsPage'
import BlogPage from './pages/BlogPage'
import CoinPage from './pages/CoinPage'


const routing = (
	<Router>
		<React.StrictMode>
			<Switch>
        <Route exact path="/home" component={App} />
        <Route exact path="/category" component={CategoryPage} />
        <Route exact path="/stock" component={StockPage} />
        <Route exact path="/coin" component={CoinPage} />
        <Route exact path="/portfolio" component={PortfolioPage} />
        <Route exact path="/blog" component={BlogPage} />
        <Route exact path="/user" component={UserPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/" component={Signup} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/events" component={EventsPage} />
			</Switch>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
