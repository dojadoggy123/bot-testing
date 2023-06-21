const express = require('express')
const app = express()  //create express app
const mongoose = require('mongoose')
const dotenv = require('dotenv')  
dotenv.config()  //connect to envronment variables

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())   //middleware to accept JSON
app.use(express.urlencoded({ extended: true }));    //allow complex object & array to be encoded. eg: nested arrays

// set root route to router
app.use('/', require('./routes/userRoute'))
app.use('/', require('./routes/emailRoute'))


// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to DB!")

    // run app on PORT 3000
    const PORT = process.env.PORT || 3000
    app.listen(PORT, ()=>{
        console.log("App is running")
    })
})
.catch((error)=>{
    console.log("Couldn't connect to DB!"+ error)
})



