const express = require("express");
const router = express.Router();

const StockModel = require("../models/stockModel");

router.get("/stock", (req, res) => {
  res.render("stock");
});

router.post("/stock", async (req, res) => {
  // this route helps to post data in the terminal.
  try {
    const stock = new StockModel(req.body);
    console.log(req.body);
    await stock.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/stock");
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
//getting stock from the database
router.get("/stocklist", async (req, res) => {
  try {
    let items = await StockModel.find().sort({ $natural: -1 });
    console.log(items)
    res.render("stocktable", {items} );
  } catch (error) {
    res.status(400).send("Unable to get data from the database.");
  }
});
//updating stock
router.get("/editstock/:id", async(req, res) =>{
  let item = await StockModel.findById(req.params.id);
  // console.log(item)
  res.render(`editstock`,{item});
})
router.put("/editstock/:id", async (req, res) =>{
  try {
        console.log(req.params.id); 
      // const product = await StockModel.findByIdAndUpdate(req.params.id,req.body,{new : true});
      // console.log(product)
      // if(!product){
      //   return res.status(404).send('product not found.')
      //  }
      //  res.redirect("/stocklist")
  } catch (error) {
    
  }
})

module.exports = router;
