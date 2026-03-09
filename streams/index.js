const express = require("express");
const fs= require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib"); // if i have to zip any file without using my memory too much
const app = express();

port = 8000;
// to zip file 

// stream read(notes.txt) -> Zipper - > fs write stream
fs.createReadStream("./notes.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./notes.zip")));

app.use(status());
// to make streams
app.get("/", (req, res)=>{
    // fs.readFile("./notes.txt", (err, data)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.end(data);
    //     }
    // })

    const stream = fs.createReadStream("./notes.txt","utf-8");
    stream.on("data",(chunk)=> res.write(chunk));
    stream.on("end",()=> res.end());
})



app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

