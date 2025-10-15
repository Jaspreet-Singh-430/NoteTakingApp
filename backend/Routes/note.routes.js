import express from "express"
import VerifyToken from "../Middlewares/verify.js"
import {createNote,getAllNotes,updateNote,deleteNote} from "../Controllers/note.controller.js"
const noteRouter=express.Router()
noteRouter.post('/create-note',VerifyToken,createNote)
noteRouter.get('/get-notes',VerifyToken,getAllNotes)
noteRouter.put('/update-note/:id',updateNote)
noteRouter.delete('/delete-note/:id',deleteNote)
export default noteRouter