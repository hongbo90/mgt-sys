import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import BookEditor from '../components/BookEditor';
import request from '../utils/request';

class BookEdit extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			book:null
		}
	}

	componentWillMount(){
		const bookId = this.context.router.params.id;
		let urlApi = "http://localhost:3000/book/" + bookId;
		request('GET',urlApi)
			.then(res=>{
				this.setState({
					book:res
				})
			});
	}

	render(){

		const {book} = this.state;

		return (
			<HomeLayout title="编辑图书">
				<main>
						
				{ 
					book ? <BookEditor editTarget={book} /> : "加载中。。。"
				}
						

					
				</main>
			</HomeLayout>
		);
	}
}

BookEdit.contextTypes = {
	router:React.PropTypes.object.isRequired
}

export default BookEdit;