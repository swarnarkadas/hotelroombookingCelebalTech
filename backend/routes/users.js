const express = require("express");

const User = require("../models/User");
const createError = require("../utils/error");

const {verifyToken,
       verifyUser,
       verifyAdmin,
       }  = require("../utils/verifyToken")

const {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
   } = require("../controllers/user")

const router = express.Router();


// router.get("/checkauthentication",verifyToken,(req,res)=>{
//     res.send("hello user, you are logged in")
// })


// router.get("/checkuser/:id",verifyUser,(req,res)=>{
//     res.send("hello user, you are logged in and you can delete your account")
// })


router.get("/checkadmin/:id",verifyAdmin,(req,res)=>{
    res.send("hello admin, you are logged in and you can delete ALL account")
})


//UPDATE
router.put("/:id", verifyUser, updateUser)


//DELETE
router.delete("/:id", verifyUser, deleteUser)


//GET
router.get("/:id", verifyUser, getUser)


//GET ALL
router.get("/", verifyAdmin,  getUsers)


module.exports = router;