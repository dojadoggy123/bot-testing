const userModel = require("../models/userModel")   // connect to database in userModel
const otpGenerator = require('otp-generator')

// initialize variables
let OTP

// controller for email requests
const getEmail = async (req, res)=>{
    try {
        const userInfo = await userModel.find({}) 
        res.status(200).json(userInfo)
    } catch (error) { 
        res.status(400).json({message:error})
    }
}

const getEmailAdd = async (req, res)=>{
    try{
        const {address} = req.params
        const userInfo = await userModel.find({email:address})
        res.status(200).json(userInfo)
    } catch (error){
        res.status(400).json({message:error})
    }
}

const checkEmailAdd = async (req, res)=>{
    try {
        const {address} = req.params
        // check if email address already exists in db
        await userModel.findOne({email: address}).then(result =>{
            if (result){
                console.log(exists)
                res.json({"exist": true})
            }else{
                res.json({"exists": false, "OTP": getOTP()}) //send OTP to validate email address
            }
        })
    }
    catch (error) {
        console.log("there is an error\n")
        res.status(400).json({message:error})
    }
}

const postEmailAdd = async (req, res)=>{
    const {req_OTP}=req.params
    if (req_OTP == OTP){
        await userModel.create(req.body)    //create email in DB
        res.json({response: "your email has been created"})
    }
}


// function to generate OTP 
function getOTP(){
    OTP = otpGenerator.generate(6, {upperCaseAlphabets: true, specialChars: false})
    return OTP
}


module.exports = {
    getEmail,
    getEmailAdd,
    checkEmailAdd,
    postEmailAdd
}