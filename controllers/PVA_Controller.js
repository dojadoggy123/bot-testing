const botModel = require('../models/botModel')  // connect to database in userModel
const otpGenerator = require('otp-generator')

// initialize variables
let OTP
let contentArr

// controller for email requests
const getEmail = async (req, res)=>{
    try {
        const email = req.query.email
        // check if email address already exists in db
        await botModel.SELECT_EXISTS(email).then(output =>{
            if (output == 1){
                contentArr = []  
                res.json({"exists": "true", "OTP": "null"})
            }else{
                res.json({"exists": "true", "OTP": getOTP()})   //send OTP to validate email address
            }
        })
    }catch (error) {
        res.status(400).json({message: error.message})
    }
}

// adds user email and name into db
const postEmail = async (req, res)=>{
    try{
        const {req_otp, email, name} = req.body

        if (req_otp == OTP){ 
            contentArr = []  // initialize empty array for user chat transcript
            let model = new botModel(email, name)
            model = await model.INSERT()
            res.json({response: "your email has been created", 'info': model})

            getOTP()   // resets OTP
        }
        else{
            res.send("wrong OTP")
        }
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

// add user's messages into content array
const postContent = async (req, res)=>{
    try {
        const message = req.body.message
        contentArr.push(message)
        res.json("user messages haqs been added to an array")
    } catch (error) {
        res.json({error: error.message})
    }
}

// update content array in db
const putTranscript = async (req, res)=>{
    try {
        botModel.UPDATE(contentArr) 
        res.status(200).send("user messages has been updated in database "+ contentArr)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


// function to generate OTP 
function getOTP(){
    OTP = otpGenerator.generate(6, {upperCaseAlphabets: true, specialChars: false})
    return OTP
}

module.exports = {
    getEmail,
    postEmail,
    postContent,
    putTranscript    
}