import express from "express"
import {Book} from '../models/bookModel.js'

const router = express.Router()


//route to create a new book
 router.post('/', async (req, res) => {
    try {

        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(404).send({ error: "enter all data needed" })
        } else {
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            }

            const book = await Book.create(newBook)
            return res.status(202).send(book)
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: error.message })
    }
})

//route to get all the book
 router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

//route to get the specific book
 router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const book = await Book.findById(id)

        return res.status(200).json({
            count: book.lenght,
            data: book
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

//route to update the book
 router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ error: "provide needed detail" })
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).send({ error: "book not the found" })
        }

        return res.status(202).send({message:"book updated successfully"})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

//route to delete a book
 router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({
                error: "book not found"
            })
        }

        return res.status(202).send({message:"book deleted successfully"})
    } catch (error) {
        res.status(202).send({ error: error.message })
    }
})

export default router
