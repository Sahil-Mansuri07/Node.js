const express=require("express");

const path=require("path");

const cookieParser=require("cookie-parser");

const {checkForAuthentication,restrictTo}=require("./middlewares/auth");

const dbConnect=require("./dbConnection");

const urlRoute=require("./routes/url");

const userRoute=require("./routes/user");

const staticRoute=require("./routes/staticRoute");

const app=express();

const PORT=8000;

dbConnect.connectToMongoDb("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url",urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);
//http://localhost:8080/url/



app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));