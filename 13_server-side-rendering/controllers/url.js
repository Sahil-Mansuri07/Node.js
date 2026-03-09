const shortId= require('shortid');

const url=require("../models/url");

async function generateShortUrl(req, res){

    const newShortId=shortId();

    const body=req.body;

    if(!body.url) return res.status(400).json({error:"url is required"});

    const result=await url.create({
        shortId:newShortId,
        redirectUrl:body.url,
        visitHistory:[],
    });

    console.log("URl is=>>", body.url);

    return res.render("home",{id:shortId});
}

async function getAnalytics(req, res){

    const shortId=req.params.id;

    const result=await url.findOne({shortId:shortId});

    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });


}

module.exports={generateShortUrl,getAnalytics};