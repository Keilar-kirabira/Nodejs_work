//1.Dependencies
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const MongoStore = require("connect-mongo");
const moment = require("moment");


require('dotenv').config();
const UserModel = require("./models/userModel");
//import routes
const classRoutes = require("./routes/classRoutes");
const authRoutes  = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const indexRoutes = require("./routes/indexRoutes");
const salesRoutes  = require("./routes/salesRoutes");
//2.Instantiations
const app = express();
const port = 3000;

//3.Configurations
app.locals.moment = moment;
//settingup mongodb connections
mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
  
  // setting view engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//4.Middleware
// app.use(express.static('public'));   //static files
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // helps to pass data from forms
//express session configs
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
  cookie: {maxAge:24*60*60*1000}    //oneday
}))
//passport configs
app.use(passport.initialize());
app.use(passport.session());

//authenticate with passport local strategy
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser()); 







//5.Routes
// using imported routes
app.use("/",classRoutes);
app.use("/",authRoutes);
app.use("/",stockRoutes);
app.use("/",indexRoutes);
app.use("/",salesRoutes);
















//non existent route handler
app.use((req, res) => {
  // new
  res.status(404).send("Oops! Route not found.");
});

//6.Bootstrapping Server
// this should always be the last line in this file.
app.listen(port, () => console.log(`listening on port ${port} `));
