const jwt=require("jsonwebtoken");

const secretKey="Sahil@$786";

async function setUser(user) {

    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secretKey);
    
}

async function getUser(token) {

    if(!token) return null;

    try {
        return jwt.verify(token,secretKey);
    } catch (error) {
        return null;
    }
    
}

module.exports={
    setUser,
    getUser,
};
