const cluster = require("node:cluster");
const os = require("os");
const express = require("express");

const totalCPUs = os.cpus().length;

if(cluster.isPrimary){
    // create worker 
    for(let i=0;i<totalCPUs;i++){
        cluster.fork();
    }
} else{
  const app = express()
  const port = 8000

  app.get("/", (req, res) => {
    res.json({ message: `hello from server ${process.pid}` });
  });

  app.listen(port, () => {
    console.log("Server started");
  });
}