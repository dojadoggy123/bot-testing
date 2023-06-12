const express = require("express")
const app = express()

// routes
app.get("/", (req, res)=>{
    res.send('bye world')
})

app.get("/bye", (req,res)=>{
    res.send('jk im not leaving')
})


app.listen(3000, ()=> {
    console.log("bye world ")
})