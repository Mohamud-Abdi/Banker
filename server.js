
// create an express app

const { log } = require("console");
const express = require("express")
const app = express()

const { PORT = 3000 } = process.env
const path = require("path");

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

app.use(express.static(path.join(__dirname,'public', 'static')))

app.listen(PORT, ()=> console.log("app is running at port: " + PORT)
)