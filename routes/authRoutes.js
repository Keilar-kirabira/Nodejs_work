const express = require("express");
const router = express.Router();
const passport = require('passport');

const UserModel = require("../models/userModel");
const salesModels = require("../models/salesModels");
//getting the signup form
router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup page" });
});

router.post("/signup", async (req, res) => {               
  try {
    const user = new UserModel(req.body);
    console.log(req.body);
    let existingUser = await UserModel.findOne({email:req.body.email});
    if (existingUser){
      return res.status(400).send("Already registered email")
    }else{
      await UserModel.register(user, req.body.password,(error)=>{
         if(error){
            throw error;
         }
         res.redirect("/login");
      })
    }
  } catch (error) {
   res.status(400).send("Try again")
  } 
  // added this res.redirect that directs me to the login page from sginup.
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {failureRedirect:'/login'}), (req, res) => {
req.session.user = req.user;
if(req.user.role === "Manager"){
  res.redirect("/dashboard")
}else if(req.user.role === "Attendant"){
  res.redirect("/Addsale")
}else (res.render("noneuser"))
});

router.get("/logout", (req,res) =>{
if(req.session){                                                  //checking for asession
  req.session.destroy((error)=>{
    if (error){
      return res.status(500).send('Error loggingout')
    }
    res.redirect('/')
  })
}
});


router.get('/getusers', async(req,res)=>{
  try {
    let users = await UserModel.find().sort({$natural: -1});
    console.log(users)
     res.render('usertable',{users});  
  } catch (error) {
    res.status(400).send('Users not found')
  }
});


module.exports = router;
