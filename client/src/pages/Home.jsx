import axios from 'axios'
import { useEffect, useState } from 'react'
 
const Home = () => {

	const [books, setBooks] = useState([])
	const [loading, setLoading] = useState(false)
	const [showType, setShowType] = useState('table') 
 
	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:5000/book")
			.then((res) => {

				setBooks(res.data.data)
				console.log(books)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [])


	return (
		<ol>
			 {books.map(item => {
				<li>{item}</li>
			 })}
		</ol>
	);
};

export default Home