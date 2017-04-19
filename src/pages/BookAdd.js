import React from 'react';
import BookEditor from '../components/BookEditor';
import HomeLayout from '../layout/HomeLayout';

class BookAdd extends React.Component{
	render(){
		return (
			<HomeLayout title="添加图书">
				<main>
					<BookEditor />
				</main>
			</HomeLayout>
		);
	}
}

export default BookAdd;