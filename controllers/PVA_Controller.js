const userModel = require("../models/userModel")   // connect to database in userModel
const otpGenerator = require('otp-generator')

// initialize variables
let OTP
let contentArr

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
                console.log("global var from getEmail is " + OTP)
            }
        })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

const postEmailAdd = async (req, res)=>{
    try{
        const {address} = req.params
        const {req_otp, req_name} = req.query
        console.log('------------------------------------------')
        console.log("req_otp is " + req_otp)

        if (req_otp == OTP){ 
            contentArr = []  // initialize empty array for user chat transcript
            const user = await userModel.create({"email": address, "name": req_name})    //create email in DB
            res.status(200).json({response: "your email has been created", 'user': user})
            // send session back to client after authenticated
            req.session.authenticated = true   
            req.session.user = {address}
            getOTP()   // resets OTP
        }
        else{
            res.json("wrong OTP")
        }
    }catch (error){
        res.status(400).json({message: error.message})
    }
}

const deleteEmailAdd = async (req, res)=>{
    try{
        const {address} = req.params
        const query = {email: address}
        const userInfo = await userModel.deleteMany(query)
        if (!userInfo){
            return res.status(404).json({message: `cannot find user with email ${address}`})
        }
        res.status(200).json(userInfo)
    }catch (error) {
        res.status(400).json(error.message)
    }
}
// controllers for saving user chat transcript into database
const postTranscript = async (req, res)=>{
    try {
        const message = req.body
        // contentArr.forEach(()=> contentArrArr.pop())
        contentArr.push(message)
        res.json({"chat transcript": contentArr})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// function to generate OTP 
function getOTP(){
    OTP = otpGenerator.generate(6, {upperCaseAlphabets: true, specialChars: false})
    return OTP
}

module.exports = {
    // email controllers
    getEmail,
    getEmailAdd,
    checkEmailAdd,
    postEmailAdd,
    deleteEmailAdd,
    // chat transcript controllers
    postTranscript
}