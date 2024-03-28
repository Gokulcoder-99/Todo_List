const express = require("express");
const authroute = express.Router();
const signup = require('../controller/authcontroller/signup');
const login = require("../controller/authcontroller/login");
authroute
  .post("/signup", signup)
  .post("/login", login)
  
module.exports = authroute;