const express= require("express")
const {connection}= require("./db")
const { userRouter } = require("./routes/user.route")
const { noteRouter } = require("./routes/note.route")
const {auth} = require('./middleware/auth.middleware')
const cors=require('cors')

const app= express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)
app.listen(4500,async()=>{
    try {
        await connection
        console.log("connect to db")
    } catch (error) {
        console.log("can't connected")
        console.log(error);
    }
    console.log("Server is running port 4500")
    
})