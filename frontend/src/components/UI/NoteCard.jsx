import React from 'react'
import {FaEdit,FaTrash} from 'react-icons/fa'
export default function NoteCard({note,onEdit,deleteNode}) {
    return (
        <div key={note._id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p>{note.description}</p>
            <div className="flex justify-end mt-2">
                <button className="text-blue-500 mr-2" onClick={()=>onEdit(note)}><FaEdit/></button>
                <button className="text-red-500" onClick={()=>deleteNode(note._id)}><FaTrash/></button>
            </div>
            
        </div>
    )
}
