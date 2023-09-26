import React from 'react'
import { Stack, Typography, Box, } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeBoxRoundedIcon from '@mui/icons-material/HomeRounded'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import Spinner from '../components/Spinner'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';


const ShowBook = () => {

  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  console.log(book)

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/book/' + id)
      .then((res) => {
        setBook(res.data.data)
        setLoading(false);
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
        <Link to='/book/create'><HomeBoxRoundedIcon sx={{ color: "lightblue", fontSize: "45px" }} /></Link>
      </Stack>

      <Stack justifyContent="center" alignItems="center" width="100" height="85vh"   >
        <Box
          width={{ xs: "75%", sm: "300px" }}
          height={{ xs: "auto", sm: "300px" }}
          sx={{
            border: "1px solid lightblue",
            borderRadius: "10px",
            boxShadow: "rgb(100, 100, 111) 0px 4px 29px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>

          {loading ?
            (<Spinner />) :
            (
              <>
                <Typography variant='h4' >Book Detail</Typography>
                <List  >

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "inherit" }}>
                        <MenuBookRoundedIcon sx={{ color: "lightblue" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <p>Title : {book.title}</p>
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "inherit" }}>
                        <PersonRoundedIcon sx={{ color: "lightblue" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <p>Author : {book.author}</p>
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "inherit" }}>
                        <CalendarMonthRoundedIcon sx={{ color: "lightblue" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <p>publish year : {book.publishYear} </p>

                  </ListItem>


                </List>
              </>
            )}

        </Box>
      </Stack>



    </>
  )
}

export default ShowBook