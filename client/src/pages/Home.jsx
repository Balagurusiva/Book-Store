import axios from 'axios'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import Spinner from '../components/Spinner'


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
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [])


	return (
		<>
			<Stack className='border-b-2  border-zinc-800 mb-10' direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant='h3'>Book Store</Typography>
				<Link to='/book/create'><AddBoxRoundedIcon sx={{ color: "lightblue", fontSize: "50px" }} /></Link>
			</Stack>


			<Stack justifyContent={{ xs: "center", ms: "center" }} alignItems="center"     sx={{ xs: { p: 6 }, ms: { p: 6 } }} >

				{loading ?
					(<Spinner />) :
					(
						<Stack direction='row' spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap">
							{books.map(item => {
								return (
									<Card sx={{ minWidth: 275, maxWidth: 300, }}>

										<Link to={'/book/detail/' + item._id}>
											<CardContent>
												<Typography variant='h4' sx={{ fontSize: 24, fontWeight: "bold" }} gutterBottom>
													{item.title}
												</Typography>
												<Typography variant='h5' sx={{ fontSize: 16 }} color="text.secondary" >
													Author - {item.author}
												</Typography>
												<Typography variant='h5' sx={{ fontSize: 16 }} color="text.secondary" >
													Publish Year - {item.publishYear}
												</Typography>
											</CardContent>
										</Link>

										<Stack direction="row" justifyContent="space-around" paddingBottom="8px">
											<Link to={'/book/delete/' + item._id}>
												<DeleteOutlineRoundedIcon sx={{ color: "red" }} /></Link>
											<Link to={'/book/edit/' + item._id}>
												<EditRoundedIcon sx={{ color: "blue" }} />
											</Link>

										</Stack>
									</Card>
								)
							})}
						</Stack>
					)}


			</Stack>




		</>
	);
};

export default Home