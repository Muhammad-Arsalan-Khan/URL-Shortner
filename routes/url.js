const express = require("express");
const router = express.Router();
const { UrlShortnerfnx , visitToShortUrl, analytic} = require("../controller/url")
router.post("/", UrlShortnerfnx)
router.get("/:shortId", visitToShortUrl)
router.get("/analytic/:shortId", analytic)

module.exports = router;