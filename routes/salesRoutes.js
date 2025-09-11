const express = require("express");
const router = express.Router();

const salesModel = require("../models/salesModels");

router.get("/Addsale", (req, res) => {
   res.render("sales");
});


router.post("/Addsale",async (req, res) => {   
   try {
      const sales = new salesModel(req.body);
      console.log(req.body);
      await sales.save();
      res.redirect('/dashboard')
   } catch (error) {
    console.error(error);
   res.redirect('/Addsale');
      
   }                 
});

router.get("/saletable",(req,res )=>{
   res.render('salestable')
})









module.exports = router;