const {Router} = require("express");
const multer = require("multer");
const path = require("path");
const router = Router();

const blogModel = require("../models/blog");
const commentModel=require("../models/comments");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null,fileName);
    }
}) 
const upload = multer({ storage: storage });

router.get("/add-new", (req, res)=>{
    return res.render("addBlog",{
        user: req.user,
    });
});

router.get("/:id", async(req, res)=>{
    
    const blog=await blogModel.findById(req.params.id).populate("createdBy");

    const comments=await commentModel.find({blogId:req.params.id}).populate("createdBy");

    return res.render("blog",{user:req.user,blog,comments});
});

router.post("/comment/:id",async(req,res)=>{

    await commentModel.create({
        content:req.body.content,
        blogId:req.params.id,
        createdBy:req.user._id,
    });

    return res.redirect(`/blog/${req.params.id}`);
});

router.post("/", upload.single("coverImage"), async(req, res)=>{
    const {title , body} = req.body;
    const blog = await blogModel.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`);
});


module.exports = router;