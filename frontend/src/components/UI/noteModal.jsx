import React,{useState,useEffect} from 'react'
export default function NoteModal({closeModel,addNote,currentNote,editNote}) {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(currentNote)
        editNote(title,description,currentNote._id)
        else 
        addNote(title,description)
    }
    useEffect(()=>{
        if(currentNote) {
            setTitle(currentNote.title)
            setDescription(currentNote.description)
        }
    },[currentNote])
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-bold mb-4">{currentNote ? "Edit Note":"Add a New Note"}</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="New Title"
                className="border border-gray-400 p-2 w-full mb-4"
                />
                <textarea type="text" value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="New Description"
                className="border border-gray-400 p-2 w-full mb-4">
                </textarea>
                <button type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >{currentNote?"Update Note":"Add Note"}</button>
                </form>
            <button onClick={closeModel} className="text-red-500 mt-4">Cancel</button>
            </div>
        </div>
    )
}
