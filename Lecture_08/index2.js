// Express.js.....

const express=require("express");

const app=express();

app.get("/home",(req, res)=>{
    res.send("Welcome to Home Page...");
});

app.get("/about",(req, res)=>{
    res.send("my name is Sahil Mansuri");
});

app.get("/contact-us",(req, res)=>{
    res.send("contact us +911234567890");
});

app.listen(8080,()=> console.log("server started....."));