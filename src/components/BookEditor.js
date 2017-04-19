import React from 'react';
import FormItem from './FormItem';
import formProvider from '../utils/formProvider';
import AutoComplete from './AutoComplete';
import request, {get} from '../utils/request';

class BookEditor extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			recommendUsers:[]
		};
	}

	componentWillMount(){
		const {editTarget,setFormValues} = this.props;
		if(editTarget){
			setFormValues(editTarget);
		}
		console.log(editTarget)
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
		this.props.onFormChange('owner_id',value);
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
		request(method, apiUrl,{
				name:name.value,
				price:price.value,
				owner_id:owner_id.value	
		})
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
		const {recommendUsers} = this.state;
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
					<AutoComplete 
						value={owner_id.value ? owner_id.value : ''}
						options={recommendUsers}
						onValueChange={(value)=>this.handleOwnerIdChange(value)}
					/>
				</FormItem>
				<FormItem label="">
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