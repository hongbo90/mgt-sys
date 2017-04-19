import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from './FormItem';
import HomeLayout from '../layout/HomeLayout';
import request from '../utils/request';

class UserEditor extends React.Component{

	componentWillMount(){
		const {editTarget, setFormValues} = this.props;
		if(editTarget){
			setFormValues(editTarget);
		}
	}

	handleSubmit(e){
		e.preventDefault();
		const {form:{name,age,gender},formValid,editTarget} = this.props;
		if(!formValid){
			alert('请填写正确的信息后重试');
		}

		console.log(editTarget);

		let editType = "添加";
		let apiUrl = "http://localhost:3000/user";
		let method = "post";

		if(editTarget){
			editType = "编辑";
			apiUrl = "http://localhost:3000/user/" + editTarget.id;
			method = "put";
		}

		request(method, apiUrl, {
				name:name.value,
				age:age.value,
				gender:gender.value
		})
		.then((res)=>{
			if(res.id){
				alert(editType + "用户成功");
				this.context.router.push('/user/list');
				return;
			}else{
				alert(editType + "失败");
			}
		})
		.catch((err)=>console.log(err));

	}

	render(){
		const {form:{name,age,gender},onFormChange} = this.props;
		return (
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

		);
	}

}


// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes={
	router:React.PropTypes.object.isRequired
};

UserEditor = formProvider({
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
})(UserEditor);

export default UserEditor;