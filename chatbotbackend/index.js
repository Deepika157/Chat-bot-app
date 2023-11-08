import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/mychatbot", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

app.get("/" ,(req,res)=>{
    res.send("My api")
})

app.listen(9001, ()=>{
    console.log("started at port 9001")
})