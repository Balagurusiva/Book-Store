import express from 'express'
import { mongoDBURL } from './config.js '
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'

const app = express()

app.use(express.json())

 app.post('/book', async (req,res) => {
    try {

        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
              return res.status(404).send({error:"enter all data needed"})
        }else{
            const newBook = {
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear
            }

            const book = await Book.create(newBook)
            return res.status(202).send(book)
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:error.message}) 
    }
 })
 




 app.get('/book', async (req,res) => {
     try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books 
        })
     } catch (error) {
        res.status(202).send({error:error.message})
     }
 })
 

mongoose.connect(mongoDBURL)
                   .then(()=>{
                    app.listen(5000, console.log("listen at 5000"))
                    console.log("connected db")
                   })
                   .catch((error)=>{
                              console.log(error)
                   })