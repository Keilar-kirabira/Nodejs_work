const express = require("express");
const router = express.Router();
const {ensureauthenticated,ensureManager} = require("../middleware/auth");

const StockModel = require("../models/stockModel");

// ensureauthenticated, ensureManager,
router.get("/stock",  (req, res) => {
  res.render("stock");
});

// ensureauthenticated, ensureManager,
router.post("/stock",  async (req, res) => {
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

//  ensureauthenticated,  ensureManager,
router.get("/dashboard", async(req, res) => {
  try {
    //expenses for buying  wood stock
    let totalExpensePoles = await StockModel.aggregate([
      {$match:{productName: "pole"}},
      {$group:{_id:"$productType",
        totalQuantity:{$sum:"$quantity"},
        //costprice is for each one item
        totalcost:{$sum: {$multiply:["$quantity","$costPrice"]}}
      }}
    ]);
      let totalExpenseTimber = await StockModel.aggregate([
      {$match:{productName: "Timber"}},
      {$group:{_id:"$productType",
        totalQuantity:{$sum:"$quantity"},
        //costprice is for each one item
        totalcost:{$sum: {$multiply:["$quantity","$costPrice"]}}
      }}
    ]);
    console.log(totalExpensePoles)
    //to avoid crashing the app if no expenses have been added
    //set default values if no expenses in the DB
    res.render("dashboard",{
    totalExpensePoles:totalExpensePoles[0],
    totalExpenseTimber:totalExpenseTimber[0],
    });
  } catch (error) {
    res.status(400).send("Unable to find items from the DB")
    console.error('Aggregation Error:',error.message)
    
  }
});

//getting stock from the database
// ensureauthenticated, ensureManager,
router.get("/stocklist",  async (req, res) => {
  try {
    let items = await StockModel.find().sort({ $natural: -1 });
    console.log(items);
    res.render("stocktable", { items });
  } catch (error) {
    res.status(400).send("Unable to get data from the database.");
  }
});

//updating stock
router.get("/editstock/:id", async (req, res) => {
  let item = await StockModel.findById(req.params.id);
  // console.log(item)
  res.render(`editstock`, { item });
});
router.put("/editstock/:id",  async (req, res) => {
  try {
    const product = await StockModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).send("product not found.");
    }
    res.redirect("/stocklist");
  } catch (error) {}
});

// router.delete("/stocklist/:id", async (req, res) => {
//   try {
//     await StockModel.findByIdAndDelete(req.params.id);
//     res.redirect('/stocklist')
//   } catch (error) {
//     res.status(500).send("error deleting stock");
//   }
// });

router.post("/deletestock",   async(req, res)=>{
  try {
       await StockModel.deleteOne({_id:req.body.id});
      res.redirect("/stocklist")
  } catch (error) {
    console.log(error.message)
    res.status(400).send('Unable to delete item from the database.')
  }
})








module.exports = router;
