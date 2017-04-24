import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import {get,del} from '../utils/request';
import {message,Table,Button,Popconfirm} from 'antd';

class BookList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			book:[]
		}
	}

	handleEdit(book){
		this.context.router.push("/book/edit/" + book.id);
	}

	handleDel(book){
		let confirmed = confirm("Make Sure to Delete ?");
		if(!confirmed){
			return;
		}
		let urlApi = "http://localhost:3000/book/" + book.id;
		del(urlApi,{
			id:book.id
		})
		.then(res=>{
			this.setState({
				book:this.state.book.filter((item)=>{return item.id != book.id})
			});
			message.success('删除图书成功');
		})
		.catch(err=>{
			console.error(err);
			message.error('删除图书失败');
		})
	}

	componentWillMount(){
		const urlApi = "http://localhost:3000/book"
		get(urlApi)
			.then((res)=>{
				this.setState({
					book:res
				});
			})
			.catch(err=>{
				console.error(err)
			})
	}

	render(){

		const {book} = this.state;
		const columns = [
			{
				title:'图书ID',
				dataIndex:'id'
			},
			{
				title:'书名',
				dataIndex:'name'
			},
			{
				title:'价格',
				dataIndex:'price',
				render:(text,record)=><span>&yen;{record.price/100}</span>
			},
			{
				title:'所有者',
				dataIndex:'owner_id'
			},
			{
				title:'操作',
				render:(text,record)=>(
					<Button.Group type="ghost">
						<Button size="small" onClick={()=>this.handleEdit(record)}>编辑</Button>
						<Popconfirm title="确定要删除吗" onConfirm={()=>this.handleDel(record)}>
							<Button size="small">删除</Button>
						</Popconfirm>
					</Button.Group>
				)
			}
		];
		return (
			<Table columns={columns} dataSource={book} rowKey={row=>row.id} />
		);
	}
}

BookList.contextTypes = {
	router:React.PropTypes.object.isRequired
}

export default BookList;