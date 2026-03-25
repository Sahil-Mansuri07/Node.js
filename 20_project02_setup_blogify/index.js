const express=require("express");
const path=require("path");
const ejs=require("ejs");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localost:27017/blogify");

const userRoute=require("./routes/user");
const app=express();
const PORT=8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    return res.render("homepage");
});

app.use("/user",userRoute);

app.listen(PORT,()=>{console.log(`Server started at PORT: ${PORT}`)});
