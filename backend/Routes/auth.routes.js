import express from 'express'
import {Register,Login,VerifyUser} from '../Controllers/auth.controller.js'
import VerifyToken from "../Middlewares/verify.js"
const authRouter=express.Router()
authRouter.post('/register',Register)
authRouter.post('/login',Login)
authRouter.get('/verify',VerifyToken,VerifyUser)
export default authRouter;