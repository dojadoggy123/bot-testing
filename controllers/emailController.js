const userModel = require("../models/userModel")   // connect to database in userModel
const otpGenerator = require('otp-generator')

// controller for email requests
const getEmail = async (req, res)=>{
    try {
        const userInfo = await userModel.find({}) 
        res.status(200).json(userInfo)
    } catch (error) { 
        res.status(400).json({message:error})
    }
}

const getEmailID = async (req, res)=>{
    try{
        const {id} = req.params
        const userInfo = await userModel.find({email:id})
        res.status(200).json(userInfo)
    } catch (error){
        res.status(400).json({message:error})
    }
}

const postEmailID = async (req, res)=>{
    try {
        const {id} = req.params
        // check if email address already exists in db
        await userModel.findOne({email: id}).then(result =>{
            if (result){
                res.status(200).json("user already exists")
            }else{
                res.status(200).json("an OTP will be sent to your email to confirm your address. Your OTP is "+getOTP()) //send OTP to validate email address
                userModel.create(req.body)
            }
        })
    }
    catch (error) {
        console.log("there is an error\n")
        res.status(400).json({message:error})
    }
}


// function to generate OTP 
function getOTP(){
    const OTP = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false})
    return OTP
}


module.exports = {
    getEmail,
    getEmailID,
    postEmailID
}