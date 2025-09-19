const express = require("express");
const router = express.Router();
const { ensureauthenticated, ensureAgent } = require("../middleware/auth");
const salesModel = require("../models/salesModels");
const stockModel = require("../models/stockModel");

router.get("/Addsale", async (req, res) => {
  try {
    const stocks = await stockModel.find();
    res.render("sales", { stocks });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/Addsale", ensureauthenticated, ensureAgent, async (req, res) => {
  try {
    const {
      customername,
      producttype,
      product,
      quantity,
      unitPrice,
      transportCharge,
      totalPrice,
      transportCheck,
      paymentMethod,
      paymentdate,
    } = req.body;
    const userId = req.session.user._id;
    const stock = await stockModel.findOne({
      productType: producttype,
      productName: product,
    });
    if (!stock) {
      return res.status(400).send("No stock");
    }
    if (stock.quantity < Number(quantity)) {
      return res
        .status(400)
        .send(`Insufficent stock, only${stock.quantity} available`);
    }
    //if you do not have total price captured on the frontend , this is what you do.
    let total = unitPrice * quantity;
    if (transportCheck) {
      total *= 1.05;
    }
    // if you  have totalPrice already captured
    // if(transportCheck){
    //  grandPrice =  totalPrice *= 1.05                //add 5%
    // };
    if (stock && stock.quantity > 0) {
      const sale = new salesModel({
        customername,
        producttype,
        product,
        quantity,
        unitPrice,
        transportCheck: !!transportCheck,
        totalPrice: total,
        paymentMethod,
        salesAgent: userId,
        paymentdate,
      });
      console.log("Saving sale:", sale);
      console.log(userId);
      await sale.save();
      
      //decrease quantity from the stock collection
      stock.quantity -= quantity
      console.log("new quantity after sale",stock.quantity)
      await stock.save();
      res.redirect("/saleslist");
    }else{
      return res.status(404).send("Product not found or soldout." )
    }
  } catch (error) {
    console.error(error.message);
    res.redirect("/Addsale");
  }
});

router.get("/saleslist", async (req, res) => {
  try {
    //Sales agent only sees their own sales
    const sales = await salesModel.find().populate("salesAgent", "fullName");
    const currentUser = req.session.user;
    res.render("salestable", { sales, currentUser });
  } catch (error) {
    console.error(error.message);
    res.redirect("/");
  }
});

router.get("/getReceipt/:id", async (req, res) => {
  try {
    //Sales agent only sees their own sales
    const sale = await salesModel.findOne({_id:req.params.id}).populate("salesAgent", "fullName");
    res.render("receipt", { sale });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Unable to find a sale.")
  }
});






module.exports = router;
