const express=require("express");

const urlModel=require("../models/url");

const router=express.Router();

router.get("/",async(req, res)=>{
    
    const allUrls=await urlModel.find({});

    return res.render("home",{url:allUrls});

});

module.exports=router;