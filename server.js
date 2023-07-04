const express = require('express')
const app = express()  //create express app
const dotenv = require('dotenv').config()  //connect to envronment variables

app.set('view engine', 'ejs')

// middlewares
app.use(express.static('public'))
app.use(express.json())  //accept json requests
app.use(express.text())
app.use(express.urlencoded({ extended: true }));   

// set root route to router
app.use('/', require('./routes/defaultRoute'))
app.use('/', require('./routes/PVARoute'))


// run app on port 3000
const PORT = process.env.PORT || 3000
try {
    app.listen(PORT, ()=>{
        console.log("App is running")
    })
} catch (error) {
    console.log(error)
}

 


