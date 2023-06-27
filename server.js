const express = require('express')
const session = require('express-session')
const app = express()  //create express app
const mongoose = require('mongoose')
const dotenv = require('dotenv')  
dotenv.config()  //connect to envronment variables

app.set('view engine', 'ejs')

// middlewares
app.use(express.static('public'))
app.use(express.json())  //accept json requests
app.use(express.urlencoded({ extended: true }));    //allow complex object & array to be encoded. eg: nested arrays

// app.use(
//     // session middleware
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         cookie: {maxAge: 25000},   // 7 days in milliseconds 7*24*60*60*1000
//         saveUninitialized: false
//     })
// )

// set root route to router
app.use('/', require('./routes/defaultRoute'))
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
    console.log("Couldn't connect to DB! "+ error)
    console.log(process.env.MONGO_URI)
})



