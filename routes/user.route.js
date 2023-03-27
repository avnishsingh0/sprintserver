const express=require("express")
const userRouter=express.Router()
const {UserModel}= require("../model/user.model")
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')


userRouter.post("/register",async(req,res)=>{
    const {email,pass,location,age}=req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user = new UserModel({email,pass:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"Reg has been done"})
        })
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})



userRouter.post("/login",async(req,res)=>{
    const {email,pass}= req.body
    try {
        const user= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login success","token":jwt.sign({"userId":user._id},"avnish")})
                }else{
                    res.status(400).send({"msg":"Wrong Crendential"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
userRouter.get("/details",(req,res)=>{
    const {token}=req.query
    jwt.verify(token,'avnish',(error,decoded)=>{
        decoded ? res.status(200).send("User Details"):res.status(400).send({"msg":error.message})
    })
   
})

userRouter.get("/moviesData",(req,res)=>{
    const {token}=req.query
    jwt.verify(token,'avnish',(error,decoded)=>{
        decoded ? res.status(200).send("Movies"):res.status(400).send({"msg":error.message})
    })
})

module.exports={
    userRouter
}