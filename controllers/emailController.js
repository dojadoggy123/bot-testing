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
        res.status(400).json({message: error.message})
    }
}

const getEmailAdd = async (req, res)=>{
    try{
        const {address} = req.params
        const userInfo = await userModel.find({email:address})
        res.status(200).json(userInfo)
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

const checkEmailAdd = async (req, res)=>{
    try {
        const {address} = req.params
        // check if email address already exists in db
        await userModel.findOne({email: address}).then(result =>{
            if (result){
                res.json({"exist": true, "OTP": null})
            }else{
                res.json({"exists": false, "OTP": getOTP()}) //send OTP to validate email address
            }
        })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

const postEmailAdd = async (req, res)=>{
    const {address} = req.params
    const {req_OTP} = req.query
    if (req_OTP == OTP){    //verify user entered correct OTP
        console.log("it is pending to be posted")
        await userModel.create({"email": address})    //create email in DB
        res.json({response: "your email has been created"})
        getOTP()   // resets OTP to random
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