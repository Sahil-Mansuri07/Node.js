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

    console.log("User details is--> ", user);

    if (!user) {

        return res.render("login",{error:"Invalid username or password"});
        
    }

    const sessionId=uuidv4();

    setUser(sessionId,user);
    
    res.cookie("uid",sessionId);

    return res.render("home");

}


module.exports={
    userSignup,
    userLogin,
};
