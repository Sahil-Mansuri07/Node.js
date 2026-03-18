const express=require("express");

const urlModel=require("../models/url");

const {checkForAuthentication,restrictTo}=require("../middlewares/auth");

const router=express.Router();

router.get("/admin/urls",restrictTo(["ADMIN"]), async(req, res)=>{

    const allUrls=await urlModel.find({});
   
    return res.render("home",{urls:allUrls});
});

router.get('/', restrictTo(["NORMAL","ADMIN"]), async(req, res)=>{

    const allUrls=await urlModel.find({createdBy:req.user._id});
   
    return res.render("home",{urls:allUrls});
});



router.get("/signup",async(req, res)=>{

    return res.render("signup");
});


router.get("/login",async(req, res)=>{

    return res.render("login");
});

module.exports=router;