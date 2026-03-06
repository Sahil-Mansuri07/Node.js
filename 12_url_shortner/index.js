const express=require("express");

const mongoose=require("mongoose");

const urlRoute=require("./routes/url");

const url=require("./models/url");

const app=express();

const PORT=8080;

app.use(express.json());

app.use("/url",urlRoute);

mongoose.connect("mongodb://localhost:27017/url-shortner");

app.get("/:shortId",async (req, res) => {

    const shortedId=req.params.shortId;

    console.log("ShortId is=>>", shortedId);

  
    
    //console.log("Entry is=>>", entry);

    if(!entry) return res.send("URL not found");

    console.log("Redirect URL is=>>", entry.redirectUrl);
    
    res.redirect(entry.redirectUrl);

});




app.listen(PORT, ()=>console.log(`Server started at PORT: ${PORT}`));

