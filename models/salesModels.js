const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
customername :{
    type : String,
    required : true
},
producttype :{
    type : String,
    required : true
},
product :{ 
    type : String,
    required : true
},
quantity:{
    type : Number,
    required : true
},
unitPrice:{
    type : Number,
    required : true
},
totalPrice: {
    type: Number,
    required: true
  },
salesAgent:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"UserModel",
    required : true
},
transportCheck:{
    type : Boolean,
    default: false,
},
paymentMethod :{
    type : String,
    required : true
},
paymentdate :{
    type : Date,
    required : true
},

});









module.exports = mongoose.model('SalesModels',salesSchema)
