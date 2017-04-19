import React from 'react';
import FormItem from './FormItem';
import formProvider from '../utils/formProvider';

class BookEditor extends React.Component{

	componentWillMount(){
		const {editTarget,setFormValues} = this.props;
		if(editTarget){
			setFormValues(editTarget);
		}
		console.log(editTarget)
	}

	handleSubmit(e){
		e.preventDefault();
		const {form:{name,price,owner_id},formValid,editTarget} = this.props;
		if(!formValid){
			alert("请输入正确的信息后重试");
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
		fetch(apiUrl,{
			method:method,
			body:JSON.stringify({
				name:name.value,
				price:price.value,
				owner_id:owner_id.value
			}),
			headers:{
				'Content-Type':'application/json'
			}
		})
		.then(res=>res.json())
		.then(res=>{
			if(res.id){
				alert(editType + "Success");
				this.context.router.push('/book/list');
				return;
			}else{
				alert(editType + "Failed");
			}
		})
		.catch(err=>{
			console.error(err);
		});
	}

	render(){
		const {form:{name,price,owner_id},onFormChange} = this.props;
		return (
			<form onSubmit={(e)=>this.handleSubmit(e)}>
				<FormItem label="书名" valid={name.valid} error={name.error}>
					<input type="text" value={name.value} onChange={(e)=>onFormChange('name',e.target.value)}  />
				</FormItem>
				<FormItem label="价格" valid={price.valid} error={price.error}>
					<input type="text" value={price.value} onChange={(e)=>onFormChange('price',e.target.value)}  />
				</FormItem>
				<FormItem label="拥有者" valid={owner_id.valid} error={owner_id.error}>
					<input type="text" value={owner_id.value} onChange={(e)=>onFormChange('owner_id',e.target.value)}  />
				</FormItem>
				<FormItem label="提交">
					<input type="submit" value="提交"/>
				</FormItem>
			</form>
		);
	}
}

BookEditor.contextTypes = {
	router:React.PropTypes.object.isRequired
}

BookEditor = formProvider({
	name:{
		defaultValue:'',
		rules:[
			{
				pattern:function(name){
					return name.length > 0;
				},
				error:'请输入书名'
			}
		]
	},
	price:{
		defaultValue:'',
		rules:[
			{
				pattern:function(price){
					return parseFloat(price) && price > 0;
				},
				error:'请输入数字'
			}
		]
	},
	owner_id:{
		defaultValue:'',
		rules:[

		]
	}
})(BookEditor);

export default BookEditor;