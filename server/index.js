import express from 'express'
import { mongoDBURL } from './config.js '
import mongoose from 'mongoose'
import bookRoutes from './routes/bookRoutes.js'
 

const app = express()

app.use(express.json())

app.use("/book", bookRoutes)


mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(5000, console.log("listen at 5000"))
        console.log("connected db")
    })
    .catch((error) => {
        console.log(error)
    })