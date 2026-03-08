const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const User = require("../models/user");
const { createTokenForUser } = require("../services/auth");

const router = Router();

/* =========================
   MULTER STORAGE
========================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images"));
  },

  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

/* =========================
   SIGNIN PAGE
========================= */

router.get("/signin", (req, res) => {
  return res.render("signin");
});

/* =========================
   SIGNUP PAGE
========================= */

router.get("/signup", (req, res) => {
  return res.render("signup");
});

/* =========================
   SIGNUP USER
========================= */

router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.create({
      fullName,
      email,
      password,

      profileImageURL: req.file
        ? `/images/${req.file.filename}`
        : "/images/default.jpg",
    });

    const token = createTokenForUser(user);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signup", {
      error: "User already exists",
    });
  }
});

/* =========================
   SIGNIN USER
========================= */

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: error.message,
    });
  }
});

/* =========================
   LOGOUT
========================= */

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  return res.redirect("/");
});

module.exports = router;
