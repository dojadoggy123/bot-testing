const userModel = require("../models/userModel")   // connect to database in userModel

// controllers for user requests

const getHome = (req, res)=>{
    res.render("homeView", {text: "*this is a variable being rendered*"})
}

const getUser = async(req,res)=>{
    const userInfo = await userModel.find({})
    res.status(200).json(userInfo)
}

// post request for user id 
const postUser = async(req,res)=>{
    try{
        const user_info = await userModel.create(req.body)
        console.log("this is a post request")
        res.status(200).json(user_info)     //send success status, and result
    }catch (error){
        console.log(error)
    }
}

// update table
const putUser = async(req,res)=>{
    try {
        const {id} = req.params
        const userInfo = await userModel.findByIdAndUpdate(id, req.body)
        if (!userInfo){
            return res.status(404).json({message: `cannot find user with id ${id}`})
        }
        const updatedUser = await userModel.findById(id)
        res.status(200).json(userInfo)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

const deleteUser = async(req,res)=>{
        const {id} = req.params
        const userInfo = await userModel.findByIdAndDelete(id)
    //     if (!userInfo){
    //         return res.status(404).json({message: `cannot find user with id ${id}`})
    //     }
        res.status(200).json(userInfo)
    // } catch (error) {
    //     console.log(error.message)
    // }
}

module.exports = {
    getHome,
    getUser,
    postUser,
    putUser,
    deleteUser
}