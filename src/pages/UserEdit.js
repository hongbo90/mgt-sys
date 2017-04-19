import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import HomeLayout from '../layout/HomeLayout';
import UserEditor from '../components/UserEditor';
import {get} from '../utils/request';

class UserEdit extends React.Component{

	constructor(props){
		super(props);
		this.state={
			user:null
		}
	}

	componentWillMount(){
		const userId = this.context.router.params.id;
		get("http://localhost:3000/user/"+userId)
			.then(res=>{
				this.setState({
					user:res
				});
			})
	}

	render(){

		const {user} = this.state;

		return (
			<HomeLayout title="编辑用户">
			{
				user ? <UserEditor editTarget={user} /> : '加载中...'
			}
			</HomeLayout>
		);
	}
}

UserEdit.contextTypes = {
	router:React.PropTypes.object.isRequired
};

export default UserEdit;