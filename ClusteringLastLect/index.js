const express = require("express");

const app = express();
port = 8000


app.get("/", (req, res) => {
    res.json({message:`hello from server ${process.pid}`});
});

app.listen(port, () => {
    console.log("Server started");
});