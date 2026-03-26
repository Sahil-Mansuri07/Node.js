const {Router}=require("express");

const userModel=require("../models/user");

const router=Router();


router.get("/signup",(req, res)=>{
    return res.render("signup");
});

router.get("/signin",(req, res)=>{
    return res.render("signin");
});

router.post("/signup",async (req,res)=>{
    
    const{fullName,email,password,}=req.body;

    const existUser=await userModel.findOne({email});

    if (existUser) return res.render("signup",{error:"Email already exist"});

    console.log("the existUser is: ",existUser);
    
    await userModel.create({fullName,email,password});

    return res.redirect("/user/signin");

});

router.post("/signin",async (req,res)=>{
    
    const{email,password}=req.body;

    try {
        const token= await userModel.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin",{error:"Invalid email or password"});
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
});

module.exports=router;
