import User from "../Models/users.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret_key=process.env.JWT_SECRET_KEY
export const Register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const user=await User.findOne({email})
        if(user)
            return res.status(401).json({msg:"User already exists",success:false})
        const hashedPwd=await bcrypt.hash(password,10)
        const newUser=new User({name,
            email,
            password:hashedPwd
        })
        await newUser.save();
        return res.status(200).json({msg:`Account created successfully ${newUser}`,success:true})
    }
    catch(err) {
    res.status(500).json({msg:`Error in registering user ${err.message}`,success:false})
    }
}
export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user)
            return res.status(401).json({msg:`User does not exist ${err.message}`,success:false});
        const checkPassword=await bcrypt.compare(password,user.password)
        if(!checkPassword)
            return res.status(401).json({msg:`Incorrect Password ${err.message}`,sucess:false});
        const token=jwt.sign({id:user._id},secret_key,{expiresIn:"6h"})
       return res.status(200).json({msg:`User logged in successfully`,token,name:user.name,success:true});
    }
    catch(err) {
        res.status(500).json({msg:`Internal server error ${err.message}`,success:false})
    }

}
export const VerifyUser=async(req,res)=>{
    try {
        res.status(200).json({success:true,user:req.user})
    }
    catch(err) {
        console.log(err.message)
    }
}