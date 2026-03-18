const sessionIdTouserMap=new Map();

async function setUser(id,user) {

    sessionIdTouserMap.set(id,user);
    
}

async function getUser(id,user) {

   return sessionIdTouserMap.get(id);
    
}

module.exports={
    setUser,
    getUser,
};