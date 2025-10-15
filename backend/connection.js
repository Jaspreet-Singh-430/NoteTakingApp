import mongoose from "mongoose"
import dotenv from "dotenv"
const ConnectDb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected successfully")
}    
catch(err) {
    console.log(`Connection error: ${err}`)
}
}
export default ConnectDb