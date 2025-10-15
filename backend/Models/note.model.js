import mongoose from 'mongoose'
const noteSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim:true
    },
    description:{
        required:true,
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
},{
    timestamps:true
})
const Note=mongoose.model("Note",noteSchema)
export default Note