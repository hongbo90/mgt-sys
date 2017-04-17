import React from 'react';

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

	render(){

		const { userList } = this.state;
		console.log(userList.map((item,index)=>{
			return item.name;
		}))
		return (
			<div>
				<header>
					<h1>用户列表</h1>
				</header>
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
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</main>
			</div>
		);
	}
}

export default UserList;