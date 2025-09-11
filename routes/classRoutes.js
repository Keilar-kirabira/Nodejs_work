const express = require("express");
const router = express.Router();
//syntax of a route
//app.METHOD(PATH, HANDLER);
//route path is like an end point e.g '/'
// routes have to be before app.listen()

// routing
// app.get('/', (req, res) => { // new
//   res.send('Homepage! Hello world.');
// });

router.get("/about", (req, res) => {
  // new
  res.send("About page. Nice.");
});

router.get("/keilar", (req, res) => {
  // new
  res.send("Keilar's page. ");
});
router.get("/contacts", (req, res) => {
  // new
  res.send("contacts page.");
});
router.post("/furniture", (req, res) => {
  // new
  res.send("we have chairs");
});
router.post("/about", (req, res) => {
  // new
  res.send("Got a POST request");
});
router.put("/user", (req, res) => {
  // new
  res.send("Got a PUT request at /user");
});
router.delete("/user", (req, res) => {
  // new
  res.send("Got a DELETE request at/user");
});





//PATH PARAMETERS AND QUERY STRINGS
//PATH PARAMS
router.get("/pathparams/:username", (req, res) => {
  res.send("This is the username " + req.params.username);
});

//QUERY STRINGS
router.get("/students", (req, res) => {
  res.send(
    "This is  " +
      req.query.name +
      " from cohort " +
      req.query.cohort +
      " class of  " +
      req.query.class
  );
});

//SERVING HTML FILES
// router.get("/", (req, res) => {
//   res.sendFile(__dirname + "/html/index.html");
// });

// beable to get the form
router.get("/registeruser", (req, res) => {
  res.sendFile(__dirname + "/html/form.html");
});
                                                                                                                                                                            
//post route
router.post("/registeruser", (req, res) => {
  console.log(req.body);
});

//home route
router.get("/home", (req, res) => {
  res.send("Home Page");
});

//signup route

router.get("/sign-up", (req, res) =>{
  res.sendFile(__dirname + "/signup.html");
});

router.post("/sign-up", (req, res) => {
  console.log(req.body);
});

// routes can be accessed in another file
module.exports = router