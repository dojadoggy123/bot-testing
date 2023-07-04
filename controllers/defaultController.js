// controllers for home page requests

const getHome = (req, res)=>{
    console.log("successfully hosted website")
    res.render("homeView", {text: "*this is a variable being rendered"})
}

const getSignIn = (req, res)=>{
    res.render("sign_in", {})
}


module.exports = {
    getHome,
    getSignIn
}