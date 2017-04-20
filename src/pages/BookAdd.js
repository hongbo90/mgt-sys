import React from 'react';
import BookEditor from '../components/BookEditor';
import HomeLayout from '../layout/HomeLayout';

class BookAdd extends React.Component{
	render(){
		return (
				<main>
					<BookEditor />
				</main>
		);
	}
}

export default BookAdd;