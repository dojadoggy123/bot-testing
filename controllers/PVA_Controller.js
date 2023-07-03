const botModel = require('../models/botModel')  // connect to database in userModel
const otpGenerator = require('otp-generator')

// initialize variables
let OTP
let contentArr

// controller for email requests
const getEmail = async (req, res)=>{
    try {
        const email = req.query.email
        console.log("SELECT_EXIXTS RETURNS A VALUE OF: " + SELECT_EXISTS(email))
        // check if email address already exists in db
        await botModel.SELECT_EXISTS(email).then(res =>{
            if (res==1){
                contentArr = []   
                res.json({"exists": true, "OTP": null})
            }else{
                res.json({"exists": false, "OTP": getOTP()})   //send OTP to validate email address
                console.log("global var from getEmail is " + OTP)
            }
        })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

// adds user email and name into db
const postEmail = async (req, res)=>{
    try{
        const {email, name} = req.body
        console.log('------------------------------------------')
        console.log("req_otp is " + req_otp)

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
const putContent = async (req, res)=>{
    try {
        const message = req.body
        contentArr.push(message)
    } catch (error) {
        res.json({error: error.message})
    }
}

// update content array in db
const putTranscript = async (req, res)=>{
    try {
        botModel.UPDATE(contentArr) 
        res.status(200).send(model)
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
    putContent,
    putTranscript    
}