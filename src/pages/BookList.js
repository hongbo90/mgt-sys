import React from 'react';
import HomeLayout from '../layout/HomeLayout';

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
		fetch(urlApi,{
			method:'delete'
		})
		.then(res=>res.json())
		.then(res=>{
			this.setState({
				book:this.state.book.filter((item)=>{return item.id != book.id})
			});
		})
	}

	componentWillMount(){
		const urlApi = "http://localhost:3000/book"
		fetch(urlApi)
			.then(res=>res.json())
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
		return (
			<HomeLayout title="图书列表">
				<main>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>书名</th>
								<th>价格</th>
								<th>owner_id</th>
							</tr>
						</thead>
						<tbody>
							{
								book.map((book,index)=>{
									return (
										<tr key={book.id + '-' + book.name}>
											<td>{book.id}</td>
											<td>{book.name}</td>
											<td>{book.price}</td>
											<td>{book.owner_id}</td>
											<td><a href="javascript:void(0)" onClick={()=>this.handleEdit(book)}>编辑</a></td>
											<td><a href="javascript:void(0)" onClick={()=>this.handleDel(book)}>删除</a></td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</main>
			</HomeLayout>
		);
	}
}

BookList.contextTypes = {
	router:React.PropTypes.object.isRequired
}

export default BookList;