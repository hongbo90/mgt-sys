import React from 'react';
import HomeLayout from '../layout/HomeLayout';

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userList:[]
		};
	}

	componentWillMount(){
		fetch("http://localhost:3000/user")
		.then(res=>res.json())
		.then(res=>{
			this.setState({
				userList:res
			});
		})
	}

	handleEdit(user){
		this.context.router.push('/user/edit/'+user.id);
	}

	handleDel(user){
		const confirmed = confirm(`确定要删除用户${user.name}吗`);

		if(confirmed){
			fetch('http://localhost:3000/user/' + user.id,{
				method:'delete'
			})
			.then(res => res.json())
			.then(res =>{
				console.log(this.state);
				this.setState({
					userList:this.state.userList.filter((item)=>{return item.id != user.id})
				});
				console.log(this.state);
				alert("删除用户成功")
			})
			.catch(err => {
				console.error(err);
				alert("用户删除失败");
			});
		}

	}

	render(){
		const { userList } = this.state;
		return (
			<HomeLayout title="用户列表">
				<main>
					<table>
						<thead>
							<tr>
								<th>用户ID</th>
								<th>用户名</th>
								<th>性别</th>
								<th>年龄</th>
							</tr>
						</thead>
						<tbody>
							{
								userList.map((item,index)=>{
									return (
										<tr key={item.id}>
											<td>{item.id}</td>
											<td>{item.name}</td>
											<td>{item.gender}</td>
											<td>{item.age}</td>
											<td><a href="javascript:void(0)" onClick={()=>this.handleEdit(item)}>编辑</a></td>
											<td><a href="javascript:void(0)" onClick={()=>this.handleDel(item)}>删除</a></td>
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

UserList.contextTypes = {
	router:React.PropTypes.object.isRequired
}

export default UserList;