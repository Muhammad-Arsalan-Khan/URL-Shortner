const shortid = require("shortid");
const URL = require("../model/url");

async function UrlShortnerfnx(req, res){
    const body = req.body
    console.log(body)
    if(!body.url) return res.status(400).json({ msg: "URL is Required" });
    const shortID = shortid.generate(); // Correct
    console.log(shortID);
    await URL.create({
        shortId: shortID, // Correct
        redirectURL: body.url,
        visiteHistory: [],
    })
    return res.status(201).render("index", {id: shortID});
}

async function visitToShortUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{$push: {
        visiteHistory:{
            timestamp: Date.now(),
        }
    }})
    if(!entry) return res.status(400).json({msg: "there is no record"});
    res.redirect(entry.redirectURL)
}

async function analytic(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    if(!result) return res.status(400).json({msg: "there is no record"});
    return res.json({
        totolClick: result.visiteHistory.length,
        analytic: result.visiteHistory,
    })
}

module.exports = {
    UrlShortnerfnx,
    visitToShortUrl,
    analytic,
}