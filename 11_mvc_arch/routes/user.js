const express=require("express");

const { getAllUsers,getUserById,createUser,}=require("../controllers/user");

const router=express.Router();

router.route("/")
.get(getAllUsers)
.post(createUser);

router.route("/:id")
.get(getUserById);

module.exports=router;
