import React,{useState,useEffect} from 'react'
import axios from "axios"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./UI/navbar.jsx"
import NoteModal from "./UI/noteModal.jsx"
import {domain} from "../../domain.js"
import {toast} from "react-toastify"
import NoteCard from "./UI/NoteCard.jsx"
export default function Home() {
    const [notes,setNotes]=useState([])
    const [currentNote,setCurrentNote]=useState(null)
    const [query,setQuery]=useState('')
    const [filteredNotes,setFilteredNotes]=useState('')
    useEffect(()=>{
        getNotes()
    },[])
    useEffect(()=>{
        setFilteredNotes(
            notes.filter((note)=>(
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.description.toLowerCase().includes(query.toLowerCase())
            ))
        )
    },[query,notes])
    const getNotes=async()=>{
        try {
            const response=await axios.get(`${domain}/api/note/get-notes`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
            setNotes(response.data.notes)
            
        }
        catch(err) {
            console.log(err)
        }
    }
    const onEdit=(note)=>{
        setCurrentNote(note)
        setModelOpen(true)
    }
    // const onDelete=(note)=>{
    //     setCurrentNote(note)
    // }
    const editNote=async(title,description,id)=>{
        try {
           console.log(domain)
            const response=await axios.put(`${domain}/api/note/update-note/${id}`,{
                title,description
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response)
            if(response.data.success)
            {
                closeModel()
                getNotes()
                toast.success("Note updated successfully")
            }
        }
        catch(err) {
        console.log(err.message)
        }
    }
    const addNote= async(title,description)=>{
           try {
            console.log(domain)
            const response=await axios.post(`${domain}/api/note/create-note`,{
                title,description
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response)
            if(response.data.success)
            {
                closeModel()
                getNotes()
                toast.success("Note added successfully")
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    const [isModelOpen,setModelOpen]=useState(false)
    const closeModel=()=>{
        setModelOpen(false)
    }
    const deleteNode=async(id)=>{
        try {
           console.log(domain)
            const response=await axios.delete(`${domain}/api/note/delete-note/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response)
            if(response.data.success)
            {
                getNotes();
                toast.success("Note deleted successfully")
            }
        }
        catch(err) {
        console.log(err.message)
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar setQuery={setQuery}/>

            <div className="px-8 pt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredNotes.length>0? filteredNotes.map(note=>(
                    <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNode={deleteNode}/>
                )):<p>No Notes</p>}
            </div>
            <button onClick={()=>setModelOpen(true)} className="bg-teal-500 cursor-pointer text-2xl text-white font-bold p-5 rounded-full fixed right-4 bottom-4">+</button>
            {isModelOpen && <NoteModal currentNote={currentNote} editNote={editNote} addNote={addNote} closeModel={closeModel}/>}
        </div>
    )
}
