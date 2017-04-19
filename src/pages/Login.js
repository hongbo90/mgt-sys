import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';
import { post } from '../utils/request';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		const {formValid,form:{account,password}} = this.props;
		if(!formValid){
			alert("请输入账号或密码");
			return;
		}

		post('http://localhost:3000/login',{
			account:account.value,
			password:password.value
		})
			.then((res)=>{
				console.log(res);
				if(res){
					this.context.router.push('/');
				}else{
					alert("登录失败，账号或密码错误");
				}
			})

	}

	render(){

		const {form:{account,password},onFormChange} = this.props;

		return (
			<HomeLayout title="登录">
				<form onSubmit={this.handleSubmit}>
					<FormItem label="用户名" valid={account.valid} error={account.error}>
						<input type="text" value={account.value}  onChange={e=>onFormChange('account',e.target.value)}/>
					</FormItem>
					<FormItem label="密码" valid={password.valid} error={password.error}>
						<input type="password" value={password.value} onChange={e=>onFormChange('password',e.target.value)} />
					</FormItem>
					<br />
					<input type="submit" value="LOGIN" />
				</form>
			</HomeLayout>
		);
	}

}

Login.contextTypes = {
	router:React.PropTypes.object.isRequired
}

Login = formProvider({
	account:{
		defaultValue:'',
		rules:[
			{
				pattern:function(value){
					return value.length > 0;
				},
				error:'请输入账号'
			}
		]
	},
	password:{
		defaultValue:'',
		rules:[
			{
				pattern:function(value){
					return value.length > 0;
				},
				error:'请输入密码'
			}
		]
	}
})(Login);

export default Login;