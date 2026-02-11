// connecting to MongoDB database

const express=require("express");

const mangoose=require("mongoose");
const { default: mongoose } = require("mongoose");

const app=express();

const PORT=8080;

app.use(express.urlencoded({extended:false}));

const userSchema=new mongoose.Schema({

    first_name:{type:String,
        required:true
    },

    last_name:{type:String},
    
    email:{type:String,
        unique:true,
        required:true
    },

    job_title:{type:String,
        required:true
    }
},
{timestamps:true});

const userModel=mongoose.model("user",userSchema);

mongoose.connect("mongodb://127.0.0.1:27017/myDb2")
 .then(()=>console.log("Database connected successfully"))
 .catch((error)=>console.log("database connection failed"));

app.get("/api/users", async(req, res)=>{

    const users=await userModel.find({});

    res.status(200).json(users);

});

app.post("/api/users", async(req, res)=>{

    const body=req.body;

    if(!body.first_name||!body.email||!body.job_title)
    {
        res.json({msg:"All fields are required"});
    }

    const result=await userModel.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        job_title:body.job_title
    });

    console.log(result);

    return res.status(201).json({msg:"data inserted"});
});

app.get("/api/users/:id", async(req, res)=>{

    const id=req.params.id;

    console.log(id);

    if(id<=0)
    {
        res.json({msg:"invalid id"});
    }

    const user=await userModel.findById(id);

    console.log(user);

    return res.status(200).json(user);

});

app.patch("/api/users/:id", async(req, res)=>{

    const id=req.params.id;

    console.log(id);

    if(id<=0)
    {
        res.json({msg:"invalid id"});
    }

    const user=await userModel.findByIdAndUpdate(id,{last_name:"mansuri"});

    return res.status(200).json(user);

});

app.delete("/api/users/:id", async(req, res)=>{

    const id=req.params.id;

    console.log(id);

    if(id<=0)
    {
        res.json({msg:"invalid id"});
    }

    const user=await userModel.findByIdAndDelete(id);

    return res.status(200).json({msg:"deleted"});

});


app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

