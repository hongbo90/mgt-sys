import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import UserAdd from './pages/UserAdd';
import Home from './pages/Home';
import UserList from './pages/UserList';



ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Home} />
		<Route path="/user/add" component={UserAdd} />
		<Route path='/user/list' component={UserList} />
	</Router>),
	document.getElementById('app')
);
