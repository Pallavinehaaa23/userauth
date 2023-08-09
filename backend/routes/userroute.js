const express = require("express");
const router = express.Router();
const {registeruser} = require("../controllers/usercontroller")
const {loginuser}=require("../controllers/usercontroller")
const {updateUserProfile}=require("../controllers/usercontroller")
const {protect} =require("../middlewares/authMiddleware")
router.route('/').post(registeruser);
router.route('/login').post(loginuser);
router.route('/profile').post(protect,updateUserProfile);
module.exports= router;