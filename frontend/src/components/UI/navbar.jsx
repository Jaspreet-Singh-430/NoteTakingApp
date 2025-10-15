import React from 'react'
import {Link} from "react-router-dom"
import {useAuth} from "../../Context/contextProvider.jsx"
export default function Navbar({setQuery}) {
    const {user,logout}=useAuth()
    console.log(user)
  return (
    <nav className="bg-gray-800 p-5 text-white flex justify-between items-center">
    <div className="text-xl font-bold">
        <Link to=''>NoteTaker</Link>
    </div>
    <input type="text" placeholder="Search notes..." className="bg-gray-600 px-4 py-2 rounded"
    onChange={(e)=>setQuery(e.target.value)}/>
    <div>
        {
            !user.name ? (
                <>
                <Link to='/login' className='bg-blue-500 mr-4 px-4 py-2 rounded'>Login</Link>
                <Link to='/signup' className='bg-green-500 mr-4 px-4 py-2 rounded'>Signup</Link>
                </>
            ):<>
            <span className="mr-4">{user.name}</span>
        <button onClick={logout} className='bg-red-500 mr-4 px-4 py-2 rounded'>Logout</button>
            </>
        }
    </div>
    </nav>
  )
}
