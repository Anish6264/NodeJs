 const http = require("http")
 const fs = require("fs")
 const url = require("url")
 const express  = require("express")

 const myServer = http.createServer((req,res)=>{
   if(req.url === "/favicon.ico"){
    return res.end()
   }
   const myUrl = url.parse(req.url,true);
    const log = `${Date.now()} ${req.method} ${req.url}: New request received\n`
    console.log(myUrl)

 fs.appendFile("log.txt",log,(err,data)=>{
    switch(myUrl.pathname){
        case "/": 
        if(req.method === "GET") res.end("home page")
        break;
        case "/about":
         const qp=myUrl.query.myname;
        res.end(`hello, ${qp}`)
        break;
        case "/signUp":
        if(req.method === "GET") res.end("signUp page")
         else if(req.method === "POST") res.end("new user created")
      break;
        default: res.end("404 page")
    }
 })

 
 })
 // http.createServer used to create a server 
// req,res)=> a call back in which two in bulit parameters are request and response for waht user request and what response you want to send

 myServer.listen(8000,()=> console.log("server is running"))
 // 3000 is the port number and we want to listen our server on this port and one server can run on one port and if everything work good then it consoles server is running

 // "start": "node index" used to run now we can run this file by npm start
 

//  console.log(req.headers); shows ip and from where your server is requested
//console.log(req); gives all the info about the request as an object because req is a very big object
//console.log(res); gives all the info about the response as an object


// GET = when you enter any url in your browser then it request to server and that 'request method' is called "GET"

// POST = when you want to send and mutate some data in server example when you want to create a new user then it create a post request

//req.method; used to show the request method
// there are 5 req method a page can have "GET", "POST", "PUT", "DELETE", "PATCH"