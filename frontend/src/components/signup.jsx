import React,{useState} from 'react'
import {domain} from "../../domain.js"
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"
export default function Signup() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [pwd,setPwd]=useState('')
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            console.log(domain)
            const response=await axios.post(`${domain}/api/auth/register`,{
                name,email,password:pwd
            })
            console.log(response)
            if(response.data.success)
            {
                navigate('/login')
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border-gray-600 shadow-lg p-6 w-100 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>           
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-4">
                    <label for="name" className="block text-gray-700 mb-1">Name: </label>
                    <input type="text" 
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400" placeholder="Enter your name"/>
                </div>
                <div className="mb-4">
                    <label for="email" className="block text-gray-700 mb-1">Email: </label>
                    <input type="email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400" placeholder="Enter your email"/>
                </div>
                <div className="mb-4">
                    <label for="password" className="block text-gray-700 mb-1">Password: </label>
                    <input type="password" 
                    onChange={(e)=>setPwd(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400" placeholder="Enter your password"/>
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-teal-600 py-2 text-white">Signup</button>
                    <p className="text-center mt-2">Already Have Account? <Link to='/login'>Login</Link></p>
                </div>
            </form>
            </div>
        </div>
    )
}
