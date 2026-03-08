const express= require("express");
const router = express.Router();
const {
  handelGenerateShortUrl,
  handelOrginalUrl,
  handelGetAnalytics
} = require("../controllers/url");

router.post("/", handelGenerateShortUrl);
router.get("/:shortId", handelOrginalUrl);
router.get("/analytics/:shortId", handelGetAnalytics);

module.exports=router 