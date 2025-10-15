import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {domain} from "../../domain.js"
import {useAuth} from "../Context/contextProvider.jsx"
import axios from 'axios'
export default function Login() {
const [email,setEmail]=useState('');
const [pwd,setPwd]=useState('');
const navigate=useNavigate();
const {login}=useAuth();
   const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            console.log(domain)
            const response=await axios.post(`${domain}/api/auth/login`,{
                email,password:pwd
            })
            console.log(response)
            if(response.data.success)
            {
                login(response.data.name)
                localStorage.setItem("token",response.data.token)
                navigate("/")
            }
        }
        catch(err) {
            console.log(err)
        }
    }
  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border-gray-600 shadow-lg p-6 w-100 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>           
            <form onSubmit={(e)=>handleSubmit(e)}>
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
                    <button type="submit" onSubmit={(e)=>handleSubmit(e)} className="w-full bg-teal-600 py-2 text-white">Login</button>
                    <p className="text-center mt-2">Don't Have Account? <Link to='/register'>Signup</Link></p>
                </div>
            </form>
            </div>
        </div>
  )
}
