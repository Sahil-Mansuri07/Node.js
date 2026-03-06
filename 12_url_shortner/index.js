const express=require("express");

const mongoose=require("mongoose");

const urlRoute=require("./routes/url");

const urlModel=require("./models/url");

const app=express();

const PORT=8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/url",urlRoute);

mongoose.connect("mongodb://localhost:27017/url-shortner");

app.get("/:shortId",async (req, res) => {

    const shortedId=req.params.shortId;

    console.log("ShortId is=>>", shortedId);

    const entry= await urlModel.findOneAndUpdate(
        {shortId:shortedId},
        {$push:{visitHistory:{timestamp:Date.now()}}},
    );
    
    res.redirect(entry.redirectUrl);

});


app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));

