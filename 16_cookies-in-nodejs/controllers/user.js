const userModel=require("../models/user");

const {v4:uuidv4}=require("uuid");

const {setUser}=require("../service/auth");

async function userSignup(req, res) {

    const {name,email,password}=req.body;
    
    await userModel.create({name,email,password});

    return res.redirect("login");
}

async function userLogin(req, res) {

    const {email,password}=req.body;
    
    const user=await userModel.findOne({email,password});


    if (!user) {

        return res.render("login",{error:"Invalid username or password"});
        
    }

    const token=setUser(user);

    return res.json({token});
}


module.exports={
    userSignup,
    userLogin,
};
