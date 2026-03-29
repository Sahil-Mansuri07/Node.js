require("dotenv").config();

const express=require("express");
const path=require("path");
const ejs=require("ejs");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");

mongoose.connect(process.env.MONGO_URL)
.then((e)=> console.log("MongoDB Connected"));

const blogModel=require("./models/blog");

const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");

const { checkForAuthenticationCookie}=require("./middlewares/authentication");

const app=express();
const PORT=process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use("/images",express.static("public/images"));

app.get("/",async(req,res)=>{

    const allBlogs=await blogModel.find({});

    return res.render("home",{user:req.user,blogs:allBlogs});
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=>{console.log(`Server started at PORT: ${PORT}`)});
