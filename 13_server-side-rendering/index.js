const express=require("express");

const path=require("path");

const connectToDb=require("./connection");

const urlModel=require("./models/url");

const urlRoute=require("./routes/url");

const staticRoute=require("./routes/staticRoute");

const app=express();

const PORT=8000;

connectToDb.dbConnection("mongodb://localhost:27017/url-shortner");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/url",urlRoute);
app.use("/abc",staticRoute);

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/:shortId",async (req, res) => {

    const shortedId=req.params.shortId;

    console.log("ShortId is=>>", shortedId);

    const entry= await urlModel.findOneAndUpdate(
        {shortId:shortedId},
        {$push:{visitHistory:{timestamp:Date.now()}}},
    );

    console.log("Redirect URl is-->>", entry.redirectUrl);
   return res.redirect(entry.redirectUrl); 

});


app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));
