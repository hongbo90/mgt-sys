import React from 'react';
import request from '../utils/request';
import {Form,Input,InputNumber,Select,Button,message} from 'antd';

const FormItem = Form.Item;

const formLayout = {
	labelCol:{
		span:4
	},
	wrapperCol:{
		span:16
	}
}

class UserEditor extends React.Component{

	componentDidMount(){
		const {editTarget,form} = this.props;
		if(editTarget){
			form.setFieldsValue(editTarget);
		}
	}

	handleSubmit(e){
		e.preventDefault();
		const {form,editTarget} = this.props;
		
		form.validateFields((err,values)=>{
			if(!err){
				let editType = "添加";
				let apiUrl = "http://localhost:3000/user";
				let method = "post";

				if(editTarget){
					editType = "编辑";
					apiUrl = "http://localhost:3000/user/" + editTarget.id;
					method = "put";
				}

				request(method, apiUrl, values)
				.then((res)=>{
					if(res.id){
						message.success(editType + "用户成功");
						this.context.router.push('/user/list');
						return;
					}else{
						message.error(editType + "失败");
					}
				})
				.catch((err)=>console.log(err));
			}else{
				message.warn(err);
			}
		})


		

		

	}

	render(){
		const {form} = this.props;
		const {getFieldDecorator} = form;
		return (
				<div>
					<Form onSubmit={(e)=>this.handleSubmit(e)}>
						<FormItem label="用户名：" {...formLayout}>
						{
							getFieldDecorator('name',{
								rules:[
									{
										required:true,
										message:'请输入用户名'
									},
									{
										pattern:/^.{1,4}$/,
										message:'用户名最多输入4个字符'
									}
								]
							})(<Input type="text" />)
						}
						</FormItem>
						<FormItem label="年龄：" {...formLayout}>
						{
							getFieldDecorator('age',{
								rules:[
									{
										required:true,
										message:'请输入年龄'
									},
									{
										min:1,
										max:100,
										type:'number',
										message:'请输入1~100的年龄'
									}
								]
							})(<InputNumber />)
						}
						</FormItem>
						<FormItem label="性别" {...formLayout}>
						{
							getFieldDecorator('gender',{
								rules:[
									{
										required:true,
										message:'请选择性别'
									}
								]
							})(<Select placeholder='请选择'>
								<Select.Option value='male'>男</Select.Option>
								<Select.Option value='female'>女</Select.Option>
							</Select>)
						}
						</FormItem>
						<FormItem wrapperCol={{...formLayout.wrapperCol, offset: formLayout.labelCol.span}}>
							<Button type="primary" htmlType="submit">添加</Button>
						</FormItem>
					</Form>
				</div>
		);
	}

}


// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes={
	router:React.PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;