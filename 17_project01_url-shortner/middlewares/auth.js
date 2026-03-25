const {getUser}=require("../service/auth");

async function checkForAuthentication(req, res, next){

    console.log("Res.Cookie  is-->>: ",req.cookies);

    const token=req.cookies?.cookieToken;

    console.log("Token value is-->>: ",token);

    req.user=null;

    if(!token) return next();

    const user=await getUser(token);

    console.log("user value is-->>: ",user);

    req.user=user;

    return next();

}

function restrictTo(roles=[]){

    return function(req,res,next){

        if(!req.user) return res.redirect("/login");

        console.log("Your role is-->>: ",req.user.role);
        
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

module.exports={checkForAuthentication,restrictTo};