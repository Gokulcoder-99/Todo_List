const express = require("express");
const userRoute = express.Router();
const create = require("../controller/todoList/create")
const update = require("../controller/todoList/update")
const read = require("../controller/todoList/read")
const remove = require("../controller/todoList/remove")
userRoute
  .post("/create",create )
  .get("/all", read)
  .post("/update",update)
  .post("/remove",remove)
  
module.exports = userRoute;