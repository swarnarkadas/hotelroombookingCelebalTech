const User = require("../models/User")


//WE are not gonna create any user as we already have 'register' function for that

//update
const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});  //we have to use 'new:true' because  without it 'findByIdAndUpdate' method update data in Database but doesn't send the updated data in 'res.json'
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

//delete
const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);  
         res.status(200).json("User has been deleted");
     }catch(err){
         next(err);
     }
}

//get
const getUser = async (req,res,next)=>{
   
    try{
        const user = await User.findById(req.params.id); 
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

//getAll
const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find(); 
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}



module.exports = {updateUser, deleteUser, getUser, getUsers};