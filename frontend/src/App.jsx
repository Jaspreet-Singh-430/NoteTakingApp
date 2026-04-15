import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Signup from './components/signup.jsx'
import Home from './components/home.jsx'
import Login from './components/login.jsx'
import Logout from './components/logout.jsx'
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
     <Route path="/register" element={<Signup/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/logout" element={<Logout/>}/>
     </Routes>
     <ToastContainer/>
    </BrowserRouter>
  )
}
export default App
