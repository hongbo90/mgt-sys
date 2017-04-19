import React from 'react';
import { Link } from 'react-router';
import HomeLayout from '../layout/HomeLayout';
import style from '../styles/home-page.less';

class Home extends React.Component{
	render(){
		return (
			<HomeLayout title="Welcome">

				<main>
					<Link to="/user/add">添加用户</Link>
					<br />
					<Link to="/user/list">用户列表</Link>
					<br />
					<Link to="/book/add">添加图书</Link>
					<br />
					<Link to="/book/list">图书列表</Link>
				</main>

			</HomeLayout>
		);
	}
}

export default Home;