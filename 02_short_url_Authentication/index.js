require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
// const {restrictToLoggedinUserOnly,checkAuth} = require("./midddleware/auth")
const { CheckForAuthentication, restrictTo } = require("./midddleware/auth");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const URL = require("./models/url");
const app = express();
const port = process.env.PORT;

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckForAuthentication);

// app.use("/url",restrictToLoggedinUserOnly,urlRouter);
app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use("/user", userRoute);
// app.use("/", checkAuth, staticRouter);
app.use("/", staticRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
