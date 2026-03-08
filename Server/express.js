
 const express  = require("express")

 const app = express() // basicaly a handler functin

 app.get("/",(req,res)=>{
    return res.end("hell br home page")
 })

 app.get("/about",(req,res)=>{
    return res.end("about page"+ " " + req.query.myname)
 })

 app.post("/signUp",(req,res)=>{
    return res.end("new user created")
 })
 // no need to take tension about query

app.listen(8000,()=>{
    console.log("server is running on port 8000")})