const asyncHandler = require("express-async-handler")
const User = require("../models/usermodel")
const generateWebToken=require("../utils/generateToken")
const registeruser =asyncHandler(async(req,res)=>{
 
    const {name,email,password,mobile}=req.body;
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,mobile
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            password:user.password,
            token:generateWebToken(user._id)
            // pic:user.pic
        })
    }else{
        res.status(400);
        throw new Error("Error occured!")
    }
    


});
const loginuser = asyncHandler(async(req,res)=>{
 const {email,password}=req.body;
 const user =await User.findOne({email});
 if(user && (await user.matchPassword(password))){
    res.json({
        id:user._id,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            token:generateWebToken(user._id)
    })
 }else{
    res.status(400);
        throw new Error("invalid email!")
 }
})
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        // isAdmin: updatedUser.isAdmin,
        token: generateWebToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });
  
module.exports={registeruser,loginuser,updateUserProfile}