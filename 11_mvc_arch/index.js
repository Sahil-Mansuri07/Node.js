const express=require("express");

const {connectMongoDb}=require("./connection");

const {logReqRes}=require("./middlewares");

const userRouter=require("./routes/user");

const app=express();

const PORT=8080;

connectMongoDb("mongodb://127.0.0.1:27017/mydb")
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log("Connection failed"));

app.use(express.urlencoded({extended:false}));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`));


