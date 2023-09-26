import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { Stack, Typography, Box, Button } from '@mui/material'
import HomeBoxRoundedIcon from '@mui/icons-material/HomeRounded'



const EditBook = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publishYear, setPublishYear] = useState()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const nav = useNavigate()


  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/book/' + id)
      .then((res) => {
        setAuthor(res.data.data.author)
        setTitle(res.data.data.title)
        setPublishYear(res.data.data.publishYear)
        console.log(res)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const handleSave = () => {
    const data = {
      title,
      author,
      publishYear
    }

    console.log("cliked")

    axios
      .put("http://localhost:5000/book/"+id, data)
      .then((res) => {
        console.log(res)
        nav('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Stack className='border-b-2  border-zinc-800 mb-10' direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='h3'>Book Store</Typography>
        <Link to='/'><HomeBoxRoundedIcon sx={{  color: "lightblue", fontSize: "35px",  marginRight:"10px"}} /></Link>
      </Stack>

      <Stack justifyContent="center" alignItems="center">
        {loading ?
          (<Spinner />) :
          (

            <Stack justifyContent="center" alignItems="center" width="100" height="85vh"   >
              <Box
                textAlign="center"
                width={{ xs: "90%", sm: "500px" }}
                height={{ xs: "auto", sm: "auto" }}
                sx={{
                  padding: "10px",
                  border: "1px solid lightblue",
                  borderRadius: "10px",
                  boxShadow: "rgb(100, 100, 111) 0px 4px 29px 0px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Typography variant='h6' mb={3}>Enter the book details to add</Typography>
                <Box sx={{ display: { xs: "block" } }} mb={2}>
                  <label>Enter the book title :</label>
                  <input
                    type="text"
                    placeholder='Title'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </Box>
                <Box sx={{ display: { xs: "block" } }} mb={2}>
                  <label>Enter the book title :</label>
                  <input
                    type="text"
                    placeholder='Name'
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} />
                </Box>



                <Box sx={{ display: { xs: "block" } }} mb={2}>
                  <label>Enter the pubished year :</label>
                  <input
                    type="number"
                    placeholder='year'
                    required
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)} />
                </Box>

                <Button variant='outlined' onClick={handleSave}>Save</Button>

              </Box>


            </Stack>
          )}
      </Stack>
    </>

  )
}

export default EditBook