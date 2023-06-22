const userModel = require("../models/userModel")   // connect to database in userModel

// controllers for home page requests

const getHome = (req, res)=>{
    res.render("homeView", {text: "*this is a variable being rendered"})
}


module.exports = {
    getHome
}