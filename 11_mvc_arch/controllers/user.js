const Users=require("../models/user");

async function getAllUsers(req, res){

const allDbUsers=await Users.find({});

if(!allDbUsers)
{
    res.status(404).json({msg:"not found"});
}

return res.json(allDbUsers);
   
}

async function getUserById(req, res){

    const id=req.params.id;

    if(id<=0)
    {
        res.json({msg:"invalid id"});
    }
    
    const user=await Users.findById(id);

    if(!user)
    {
        res.status(404).json({msg:"not found"});
    }

    return res.status(200).json(user);

}  

async function createUser(req, res){

    const body=req.body;

    if(!body||!body.first_name||!body.email||!body.job_title)
    {
        return res.status(400).json({msg:"all fields are required"});
    }

    const user=await Users.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        job_title:body.job_title,
    });

    if(!user)
    {
        return res.json({msg:"something went wrong"});
    }

    return res.status(201).json(user);

}  

async function updateUser(req, res){
    
    const id=req.params.id;

    if(id<=0)
        {
            res.json({msg:"invalid id"});
        }
        
    const updatedUser=await Users.findByIdAndUpdate(id,{last_name:"Khan"});

    return res.status(200).json(updatedUser);

}

async function deleteUser(req, res){
    
    const id=req.params.id;

    if(id<=0)
        {
            res.json({msg:"invalid id"});
        }
        
    await Users.findByIdAndDelete(id);

    return res.status(200).json({msg:"deleted"});

}




module.exports={
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};


