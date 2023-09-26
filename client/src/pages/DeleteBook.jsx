import React, { useState } from 'react'
import { Stack, Typography, Box, Button } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HomeBoxRoundedIcon from '@mui/icons-material/HomeRounded'
import Spinner from '../components/Spinner'
import axios from 'axios'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const nav = useNavigate()
  const handleDelete = () => {

    setLoading(true)

    axios
      .delete('http://localhost:5000/book/' + id)
      .then(() => {
        setLoading(false)
        nav('/')
      })
      .catch((error)=>{
        setLoading(false)
        console.log(error)
      })

  }
  return (
    <>

      <Stack className='border-b-2  border-zinc-800 mb-10' direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='h3'>Book Store</Typography>
        <Link to='/'><HomeBoxRoundedIcon sx={{ color: "lightblue", fontSize: "35px",  marginRight:"10px"}} /></Link>
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

                <Typography>Are sure delete this book?</Typography>

                <Button onClick={handleDelete}>yes, I'm</Button>

              </Box>




            </Stack>
          )}
      </Stack>


    </>
  )
}

export default DeleteBook