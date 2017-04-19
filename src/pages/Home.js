import React from 'react';
import { Link } from 'react-router';
import HomeLayout from '../layout/HomeLayout';
import style from '../styles/home-page.less';

class Home extends React.Component{
	render(){
		return (
			<HomeLayout title="Welcome">
				<div className={style.welcome}>
					Welcome
				</div>
			</HomeLayout>
		);
	}
}

export default Home;