//Custom URL Shortener Project
const express = require("express");
const app = express();
const Port = 1181;
const urlRoute = require("./routes/url");
const { logReqRes } = require("./midleware/url")
const { connectMongoDB } = require("./connection")
const URL = require("./model/url")
const path = require("path")
const staticRouter = require("./routes/staticRouter")

//midleware
app.use(logReqRes("log.txt"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/url", urlRoute);
app.get("/ui",async (req, res)=>{  
    const allUser =await URL.find({})
    return res.end(`${allUser.map(url => `<li>${url.shortId} -> ${url.redirectURL} ${url.visiteHistory.length}</li>`).join("")}`);
})

// app.get("/", (req, res)=>{
//     return res.render("index")
// })

//Static File
app.use("/", staticRouter)


//EJS UI/UX app.use(express.static("public")); app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static("public"));




//Data base MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/urlShortnerDatabase").then(()=>{console.log("connect to MongoDB")});
app.listen(Port, ()=>{console.log(`Server Start at Port ${Port}`)});





//ya server side rendering hain hum is trha b html likh sakta hain pr ya good practice ni hain
// app.get("/ui",async (req, res)=>{  
//     const allUser =await URL.find({})
//     return res.end(`${allUser.map(url => `<li>${url.shortId} -> ${url.redirectURL} ${url.visiteHistory.length}</li>`)}`);
// } )