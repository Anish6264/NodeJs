require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");

const UserRoute = require("./routes/user");
const BlogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  return res.render("home", {
    blogs: allBlogs,
  });
});

app.use("/user", UserRoute);
app.use("/blog", BlogRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
