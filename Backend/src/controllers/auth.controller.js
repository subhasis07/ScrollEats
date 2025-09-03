const userModel=require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");


dotenv.config();

async function registeruser(req, res) {
    const {fullName, email, password}= req.body;

    const userAlreadyExist=await userModel.findOne({
        email
    })

    if(userAlreadyExist){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    const hasedPassword= await bcrypt.hash(password,10);

    const user= await userModel.create({
        fullName, 
        email, 
        password:hasedPassword
    })

    const token= jwt.sign({
        id:user._id
    }, process.env.JWT_TOKEN)

    res.cookie("token", token);

    res.status(201).json({
        message:"user register successfully",
        user:{
            id: user._id,
            fullName:user.fullName,
            email:user.email
        }
    })
}

async function loginUser(req,res) {
    const {email, password}=req.body;

    const user=await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid= await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token=jwt.sign({
        id:user._id,

    }, process.env.JWT_TOKEN)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id: user._id,
            fullName:user.fullName,
            email:user.email
        }
    })
}

function logoutUser(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
    
}

module.exports={
    registeruser,
    loginUser,
    logoutUser
}