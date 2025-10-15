import React,{useState,createContext,useContext,useEffect} from 'react'
import axios from 'axios'
import {domain} from '../../domain.js'
const authContext=createContext()
export default function ContextProvider({children}) {
    const [user,setUser]=useState('');
    const login=(user)=>{
        setUser(user)
    }
    const logout=()=>{
        localStorage.removeItem('token')
        setUser(null)
    }
    useEffect(()=>{
        const verifyUser=async()=>{
            try {
                const response=await axios.get(`${domain}/api/auth/verify`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(response.data.success)
                    setUser(response.data.user)
                else
                setUser(null)
            }
            catch(err) {
                console.log(err.message)
            }
        }
        verifyUser()
    },[])
    return (
        <authContext.Provider value={{user,login,logout}}>
            {children}
        </authContext.Provider>
    )
}
export const useAuth=()=>useContext(authContext)