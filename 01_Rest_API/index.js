require("dotenv").config();
const expreess = require("express");
const { connectMongoDB } = require("./connection");
// const users = require("./MOCK_DATA.json")
const app = expreess();
const port = process.env.PORT;
const userRouter = require("./routes/user");
const { logReqRes } = require("./middleWares");

//Connection
connectMongoDB(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

//middlewAre
app.use(expreess.urlencoded({ extended: false })); // this will execute first and then we can use req.body in our routes because it is a middleware

app.use(logReqRes("./task.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
