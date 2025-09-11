const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
   productName :{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    costPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    supplierName:{
        type:String,
        required:true
    },
    datebought:{
        type:Date,
        required:true
    },
    quality:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    measurements:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('StockModel',stockSchema)