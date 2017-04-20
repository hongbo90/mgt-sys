import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import HomeLayout from '../layout/HomeLayout';
import UserEditor from '../components/UserEditor';

class UserAdd extends React.Component{
	render(){
		return (
			<UserEditor />
		);
	}
}

export default UserAdd;