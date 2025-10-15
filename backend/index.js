import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from "./connection.js"
import noteRouter from "./Routes/note.routes.js"
import authRouter from "./Routes/auth.routes.js"
import cors from "cors"
dotenv.config()
const endpoint=process.env.FRONT_ENDPOINT;
const app=express()
app.use(express.json())
app.use(cors(
    {
        origin:endpoint
    }
))
app.use("/api/auth",authRouter)
app.use("/api/note",noteRouter)
const port=process.env.PORT
ConnectDb();
app.listen(port,()=>{
    console.log(`Server is listening at ${port}`)
})