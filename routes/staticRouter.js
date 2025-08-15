const express = require("express");
const router = express.Router();
const URL = require("../model/url");

router.get("/", async (req, res) => {
    const alluser = await URL.find({});
    res.render("index", {
        urls: alluser,
    })
})

module.exports = router;