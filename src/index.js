import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import UserAdd from './pages/UserAdd';
import Home from './pages/Home';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import BookAdd from './pages/BookAdd';
import BookList from './pages/BookList';
import BookEdit from './pages/BookEdit';
import Login from './pages/Login';


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Home} />
		<Route path="/user/add" component={UserAdd} />
		<Route path='/user/list' component={UserList} />
		<Route path='/user/edit/:id' component={UserEdit} />
		<Route path='/book/add' component={BookAdd} />
		<Route path='/book/list' component={BookList} />
		<Route path="/book/edit/:id" component={BookEdit} />
		<Route path="/login" component={Login} />
	</Router>),
	document.getElementById('app')
);
