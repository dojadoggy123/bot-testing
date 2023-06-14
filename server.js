const express = require("express")
const mongoose = require("mongoose")
const userModel = require("./models/userModel")
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())  //middleware to accept JSON


// routes
app.get("/", (req, res)=>{
    res.render("home",{})
})

app.get("/send_email", async(req,res)=>{
    try {
        const userInfo = await userModel.find({})
        res.status(200).json(userInfo)
    } catch (error) { //juoi
        console.log(error.messsage)
    }
})

// post request for user id 
app.post("/send_email", async(req,res)=>{
    try{
        const user_info = await userModel.create(req.body)
        console.log("this is a post request")
        res.status(200).json(user_info)

    }catch (error){
        console.log(error)
    }
})

// update table
app.put("/send_email/:id", async(req,res)=>{
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
})

app.delete("/send_email/:id", async(req,res)=>{

        const {id} = req.params
        const userInfo = await userModel.findByIdAndDelete(id)
    //     if (!userInfo){
    //         return res.status(404).json({message: `cannot find user with id ${id}`})
    //     }
        res.status(200).json(userInfo)
    // } catch (error) {
    //     console.log(error.message)
    // }
})


// connect to mongodb and run app on port 3000
mongoose.connect('mongodb+srv://user:12345@bot-db.fhivkni.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to db!')
    app.listen(3000, ()=> {
        console.log("App is running")
    })

}).catch((error) => {
    console.log(error)
})

