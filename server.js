const express = require('express')
const app = express()  //create express app
const mongoose = require('mongoose')
const dotenv = require('dotenv')  
dotenv.config()  //connect to envronment variables

app.set('view engine', 'ejs')
app.use(express.json())   //middleware to accept JSON


// set root route to router
app.use('/', require('./routes/user'))

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to DB!")
})
.catch(()=>{
    console.log("App is running!")
})

// run app on PORT 3000
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("App is running!")
})

