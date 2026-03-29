const express=require("express");
const fs=require("fs");
const zlib=require("zlib");

const app=express();
const PORT=9000;

//Stream Read(Sample.txt)-->Zipper-->Write Stream(Sample2.txt)
fs.createReadStream("sample.txt")
.pipe(zlib.createGzip()
.pipe(fs.createWriteStream("sample2.txt")));

app.get("/home",(req, res)=>{
    const stream=fs.createReadStream("sample2.txt","utf-8");
    stream.on("data", (chunk)=>{
        res.write(chunk);
    });
    stream.on("end",()=>{
        res.end();
    });
});

app.listen(PORT,()=>{console.log(`Server started at PORT ${PORT}`);});