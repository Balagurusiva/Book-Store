import express from 'express'

const app = express()

app.use((req,res)=>{
    res.send("<h1>hello</h1>")
})

 app.listen(3000, console.log("listen at 3000"))