import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';

class UserAdd extends React.Component{

	handleSubmit(e){
		e.preventDefault();
		const {form:{name,age,gender},formValid} = this.props;
		if(!formValid){
			alert('请填写正确的信息后重试');
		}

		fetch("http://localhost:3000/user",{
			method:'post',
			body:JSON.stringify({
				name:name.value,
				age:age.value,
				gender:gender.value
			}),
			headers:{
				'Content-Type':'application/json'
			}
		})
		.then((res)=>res.json())
		.then((res)=>{
			if(res.id){
				alert("添加用户成功");
			}else{
				alert("添加失败");
			}
		})
		.catch((err)=>console.log(err));

	}

	render(){
		const {form:{name,age,gender},onFormChange} = this.props;
		console.log(this.props);
		console.log(this.onFormChange)
		return (
			<div>
				<header>
					<h1>添加用户</h1>
				</header>
				<main>
					<form onSubmit={(e)=>this.handleSubmit(e)}>
						<FormItem label="用户名：" valid={name.valid} error={name.error}>
							<input type="text" value={name.value} onChange={(e)=>onFormChange('name',e.target.value)} />
						</FormItem>
						<FormItem label="年龄：" valid={age.valid} error={age.error}>
							<input type="text" value={age.value || ''} onChange={(e)=>onFormChange('age',+e.target.value)} />
						</FormItem>
						<FormItem label="性别：" valid={gender.valid} error={gender.valid}>
							<select value={gender.value} onChange={(e)=>onFormChange('gender',e.target.value)}>
								<option>请选择性别</option>
								<option value="male">男</option>
								<option value="female">女</option>
							</select>
						</FormItem>
						<input type="submit" value="提交" />
					</form>
				</main>
			</div>
		);
	}

}

UserAdd = formProvider({
	name:{
		defaultValue:'',
		rules:[
			{
				pattern:function(value){
					return value.length > 0;
				},
				error:'请输入用户名'
			},
			{
				pattern:/^.{1,4}$/,
				error:'用户名最多输入4个字符'
			}
		]
	},
	age:{
		defaultValue:'',
		rules:[
			{
				pattern:function(value){
					return value >=1 && value <= 100 && (typeof value == 'number');
				},
				error:'请输入1~100的年龄'
			}
		]
	},
	gender:{
		defaultValue:'',
		rules:[
			{
				pattern:function(value){
					return !!value;
				},
				error:'请选择性别'
			}
		]
	}
})(UserAdd);

export default UserAdd;