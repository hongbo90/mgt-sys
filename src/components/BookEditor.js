import React from 'react';
import formProvider from '../utils/formProvider';
import AutoComplete from './AutoComplete';
import request, {get} from '../utils/request';
import {Input,InputNumber,Form,Button,message} from 'antd';

const Option = AutoComplete.Option;
const FormItem = Form.Item;
const formLayout = {
	labelCol:{
		span:4
	},
	wrapperCol:{
		span:16
	}
};

class BookEditor extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			recommendUsers:[]
		};
		this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
	}

	componentDidMount(){
		const {editTarget,form} = this.props;
		if(editTarget){
			form.setFieldsValue(editTarget);
		}
	}

	getRecommendUsers(partialUserId){
		get("http://localhost:3000/user?id_like=" + partialUserId)
			.then((res)=>{
				if(res.length == 1 && res[0].id == partialUserId){
					return;
				}
				this.setState({
					recommendUsers:res.map((user)=>{
						return {
							text:`${user.id}(${user.name})`,
							value:user.id
						}
					})
				})

			});

	}

	timer = 0;

	handleOwnerIdChange(value){
		// this.props.onFormChange('owner_id',value);
		this.setState({
			recommendUsers:[]
		});

		if(this.timer){
			clearTimeout(this.timer);
		}

		if(value){
			this.timer = setTimeout(()=>{
				this.getRecommendUsers(value);
				this.timer = 0;
			},200)
		}

	}


	handleSubmit(e){
		e.preventDefault();
		const {form,editTarget} = this.props;
		
		form.validateFields((err,values)=>{
			if(err){
				message.warn(err);
				return;
			}

			let apiUrl = "http://localhost:3000/book";
			let method = 'post';
			let editType = "添加";
			if(editTarget){
				method = 'put';
				editType = "编辑";
				apiUrl = apiUrl + "/" + editTarget.id;
			}

			request(method, apiUrl,values)
			.then(res=>{
				if(res.id){
					message.success(editType + "Success");
					this.context.router.push('/book/list');
					return;
				}else{
					message.error(editType + "Failed");
				}
			})
			.catch(err=>{
				console.error(err);
			});


		})
		
	}

	render(){
		const {recommendUsers} = this.state;
		const {form} = this.props;
		const {getFieldDecorator} = form;
		return (
			<Form onSubmit={(e)=>this.handleSubmit(e)}>
				<FormItem label="书名" {...formLayout}>
					{
						getFieldDecorator('name',{
							rules:[
								{
									required:true,
									message:'请输入书名'
								}
							]
						})(<Input type='text' />)
					}
				</FormItem>
				<FormItem label="价格" {...formLayout}>
					{
						getFieldDecorator('price',{
							rules:[
								{
									required:true,
									message:'请输入价格',
									type:'number'
								},
								{
									message:'请输入1~99999的数字',
									min:1,
									max:99999,
									type:'number'
								}
							]
						})(<InputNumber />)
					}
				</FormItem>
				<FormItem label="拥有者" {...formLayout}>
					{
						getFieldDecorator('owner_id',{
							rules:[
								{
									required:true,
									message:'请输入所有者ID',
								},
								{
									pattern: /^\d*$/,
                					message: '请输入正确的ID'
								}
							]
						})(
							<AutoComplete 
								options={recommendUsers}
								onChange={this.handleOwnerIdChange}
							/>)
					}
					
				</FormItem>
				<FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
					<Button type="primary" htmlType="submit">提交</Button>
				</FormItem>
			</Form>
		);
	}
}

BookEditor.contextTypes = {
	router:React.PropTypes.object.isRequired
}

BookEditor = Form.create()(BookEditor);

export default BookEditor;