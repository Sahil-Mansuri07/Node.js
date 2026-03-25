const userModel=require("../models/user");

const {v4:uuidv4}=require("uuid");

const {setUser}=require("../service/auth");

async function userSignup(req, res) {

    const {name,email,password,role}=req.body;
    
    await userModel.create({name,email,password,role});

    return res.redirect("login");
}

async function userLogin(req, res) {

    const {email,password}=req.body;
    
    const user=await userModel.findOne({email,password});


    if (!user) {

        return res.render("login",{error:"Invalid username or password"});
        
    }

    const token=await setUser(user);

    console.log("Controllers Token value is-->>: ",token);

    res.cookie("cookieToken",token);

    return res.redirect("/");
}


module.exports={
    userSignup,
    userLogin,
};
