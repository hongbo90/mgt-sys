import React from 'react';

class UserAdd extends React.Component{

	constructor(){
		super();
		this.state = {
			form:{
				name:{
					value:'',
					valid:false,
					errorTips:'',
				},
				age:{
					value:'',
					valid:false,
					errorTips:'',
				},
				gender:{
					value:'',
					valid:false,
					errorTips:'',
				}
			}
		}
	}

	handleValueChange(field,value,type="string"){
		if(type == "number"){
			value += value;
		}
		const {form} = this.state;

		const newFieldObj = {value,valid:true,errorTips:''};

		switch(field){
			case 'name':
				if(value.length > 5){
					newFieldObj.valid = false;
					newFieldObj.errorTips = "用户名最多4字符";
				}else if(value.length == 0){
					newFieldObj.valid = false;
					newFieldObj.errorTips = "请输入用户名"
				}
				break;
			case 'age':
				if(value > 100 || value <= 0 || typeof value !== 'number'){
					newFieldObj.valid = false;
					newFieldObj.errorTips = "请输入1~100之间的数字";
				}
				break;
			case 'gender':
				if(!value){
					newFieldObj.valid = false;
					newFieldObj.errorTips = "请选择性别";
				}
				break;
		}

		this.setState({
			form:{
				...form,
				[field]:newFieldObj
			}
			
		});
	}

	handleSubmit(e){
		e.preventDefault();
		const {form:{name,age,gender}} = this.state;
		if(!name.valid || !age.valid || !gender.valid){
			alert("请输入正确的信息后重试");
			return;
		}
		console.log(name);
		fetch("http://localhost:3000/user",{
			method:'post',
			body:JSON.stringify({
				name,
				age,
				gender
			}),
			headers:{
				'Content-Type':'application/json'
			}
		})
			.then((res) =>res.json())
			.then((res) => {
				if(res.id){
					alert("添加成功");
					this.setState({
						name:'',
						age:0,
						gender:''
					});
				}else{
					alert("添加失败");
				}
			})
			.catch((err) => console.error(err));

	}

	render(){
		const {form:{name,age,gender}} = this.state;
		return (
			<div>
				<header>
					<h1>添加用户</h1>
				</header>
				<main>
					<form onSubmit={(e)=>this.handleSubmit(e)}>
						<div>
							<label>用户名：</label>
							<input type="text" value={name.value} onChange={(e) =>this.handleValueChange('name',e.target.value)} />
							{ !name.valid && <span>{name.errorTips}</span>}
						</div>
						<div>
							<label>年龄：</label>
							<input type="text" value={age.value || ''} onChange={e => this.handleValueChange('age',e.target.value)} />
							{ !age.valid && <span>{age.errorTips}</span>}
						</div>
						<div>
							<label>性别：</label>
							<select value={gender.value} onChange={(e) => this.handleValueChange('gender',e.target.value)}>
								<option value="">请选择</option>
								<option value="male">男</option>
								<option value="female">女</option>
							</select>
							
							{ !gender.valid && <span>{gender.errorTips}</span>}
							
							
						</div>
						<div>
							<input type="submit" value="提交" />
						</div>
					</form>
				</main>
			</div>
		);
	}
}

export default UserAdd;