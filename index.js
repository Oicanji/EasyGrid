require('dotenv').config()
const app = require("express")();
const express = require('express');
const path = require('path');

//
const session = require('express-session');
const consign = require("consign");
const port = process.env.PORT
const bodyParser = require("body-parser");

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: process.env.AUTHSECRET}));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


/*
 *  Carregamento automatico das libs
*/
consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./core/validation.js")
  .then("./core/auth.js")
  .then("./core/upload.js")
  .then("./controller")
  .then("./core")
  .then("./config/service.js")
  .then("./config/routes.js")
  .into(app);


app.listen(port, () => {
  console.log("Ta tudo ok por enquanto...");
});
