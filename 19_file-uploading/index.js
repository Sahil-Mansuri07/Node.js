const express=require("express");
const multer=require("multer");
const path=require ("path");

const app=express();
const PORT =8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const storage=multer.diskStorage({
    destination:function(req, file, cb) {
        return cb(null, "./uploads");
    },
    filename:function(req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({storage:storage});

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",(req, res)=>{
    return res.render("homepage");
});

app.post("/upload", upload.single("myImage"),(req,res)=>{
   
    console.log(req.body);
    console.log(req.file);
   
    return res.end("file successfully uploaded");
});

app.listen(PORT,()=>{
    console.log(`Server started at PORT: ${PORT}`);
});