import Note from "../Models/note.model.js"
export const createNote=async(req,res)=>{
    try {
        const {title,description}=req.body
        if(!title || !description)
            return res.status(400).json({msg:"title and description are required"})
        const newNote=new Note({title,description,userId:req.user._id})
        await newNote.save()
        res.status(201).json({msg:"note saved successfully",success:true})
    }
    catch(err) {
        res.status(500).json({msg:err.message,success:false})
    }
}
export const getAllNotes=async(req,res)=>{
    try {
        const notes=await Note.find({userId:req.user._id}).sort({createdAt:-1})
        res.status(200).json({notes,success:true})

    }
    catch(err) {
        res.status(500).json({msg:err.message,success:false})
    }
}
export const updateNote=async(req,res)=>{
    try {
        const {title,description}=req.body
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,description})
        if(!updatedNote)
        return res.status(404),json({msg:"Note not updated"})
        res.status(200).json({updatedNote,success:true})
    }
    catch(err) {
        res.status(500).json({msg:err.message,success:false})
    }
}
export const deleteNote=async(req,res)=>{
    try {
     const deletedNote=await Note.findByIdAndDelete(req.params.id)
     if(!deletedNote)
        return res.status(404).json({msg:"Note not found",success:false})
    res.status(200).json({msg:"Note deleted successfully",success:true})

    }
    catch(err) {
        res.status(500).json({msg:err.message,success:false})
    }
}