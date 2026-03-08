const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

/* =========================
   MULTER IMAGE STORAGE
========================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("./public/uploads"));
  },

  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

/* =========================
   ADD BLOG PAGE
========================= */

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

/* =========================
   SHOW ONLY USER BLOGS
========================= */

router.get("/my-blogs", async (req, res) => {
  const blogs = await Blog.find({
    createdBy: req.user._id,
  });

  return res.render("yourBlogs", {
    blogs,
    user: req.user,
  });
});

/* =========================
   EDIT BLOG PAGE
========================= */

router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.redirect("/");
  }

  if (blog.createdBy.toString() !== req.user._id.toString()) {
    return res.redirect("/");
  }

  return res.render("editBlog", {
    blog,
    user: req.user,
  });
});

/* =========================
   UPDATE BLOG
========================= */

router.post("/edit/:id", async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.redirect("/");
  }

  if (blog.createdBy.toString() !== req.user._id.toString()) {
    return res.redirect("/");
  }

  await Blog.findByIdAndUpdate(req.params.id, {
    title,
    body,
  });

  return res.redirect("/blog/my-blogs");
});

/* =========================
   CREATE BLOG
========================= */

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    title,
    body,

    createdBy: req.user._id,

    coverImage: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
});

/* =========================
   DELETE BLOG
========================= */

router.post("/delete/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.redirect("/");
  }

  if (blog.createdBy.toString() !== req.user._id.toString()) {
    return res.redirect("/");
  }

  await Blog.findByIdAndDelete(req.params.id);

  return res.redirect("/blog/my-blogs");
});

/* =========================
   ADD COMMENT
========================= */

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,

    createdBy: req.user._id,

    blogId: req.params.blogId,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

/* =========================
   DELETE COMMENT
========================= */

router.post("/comment/delete/:commentId", async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    return res.redirect("/");
  }

  const blog = await Blog.findById(comment.blogId);

  if (
    comment.createdBy.toString() === req.user._id.toString() ||
    blog.createdBy.toString() === req.user._id.toString()
  ) {
    await Comment.findByIdAndDelete(req.params.commentId);
  }

  return res.redirect(`/blog/${blog._id}`);
});

/* =========================
   VIEW SINGLE BLOG
========================= */

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  const comments = await Comment.find({
    blogId: req.params.id,
  }).populate("createdBy");

  return res.render("blog", {
    blog,
    comments,
    user: req.user,
  });
});

module.exports = router;
