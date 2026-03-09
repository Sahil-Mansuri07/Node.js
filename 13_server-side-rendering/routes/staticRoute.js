const express=require("express");

const urlModel=require("../models/url");


async function staticRoute(req, res){
    
    const allUrls=await urlModel.find({});

    return res.render("home",{urls:allUrls});

};

module.exports=staticRoute;