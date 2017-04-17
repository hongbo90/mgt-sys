import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import UserAdd from './pages/UserAdd';
import Home from './pages/Home';



ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Home} />
		<Route path="/user/add" component={UserAdd} />
	</Router>),
	document.getElementById('app')
);
