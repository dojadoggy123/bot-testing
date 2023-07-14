const botModel = require('../models/botModel')  // connect to database in userModel
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

// controller for email requests
const postEmail = async (req, res)=>{
    try {
        const {id, email, name} = req.body
        const model = new botModel(id, email, name)
        await model.INSERT()

        // check if email address already exists in db
        await botModel.SELECT_EXISTS(email).then(output =>{
            if (output == 1){
                res.json({"exists": "yes", "OTP": "null"})
            }else{
                res.json({"exists": "no", "OTP": model.otp })   //send OTP to validate email address
            }
        })
    }catch (error) {
        res.status(400).json({message: error.message})
    }
}

// verify email
const putEmail = async (req, res)=>{
    try{
        const {req_otp, exists, id, email} = req.body
        if (req_otp == botModel.RETRIEVE_OTP(id) || exists){ 

            botModel.VERIFIED_OTP(id)   //sign the email as verified
            const token = generateTkn(email)

            res.cookie('token', token, {
                maxAge: 24*60*60*100,
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            })

            res.status(200).json("correct OTP, your account has been verified")
        }
        else{
            res.status(400).json("wrong OTP")
        }
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

// update content array in db
const putContent = async (req, res)=>{
    try {
        const {id, message} = req.body
        await botModel.UPDATE_CONTENT(id, message) 
        res.status(200).json('user messages has been updated in the database')
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postEmail,
    putEmail,
    putContent,   
}

// function to generate jwt
function generateTkn (email){
    return jwt.sign({"email": email}, process.env.TOKEN_SECRET, {expiresIn: '300s'}) //30 minutes
}   
