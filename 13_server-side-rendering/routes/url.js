const express=require("express");

const urlModel=require("../models/url");

const {generateShortUrl,getAnalytics}=require("../controllers/url");

const router=express.Router();

router.post("/",generateShortUrl);

router.get("/analytics/:id",getAnalytics);

module.exports=router;
