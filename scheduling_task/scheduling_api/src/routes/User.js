const express = require("express");

const routes = require("../utils/routes");
const { registerUser, getAllUser, getOneUser } = require("../controller/User");

const userRouter = express.Router();

// ------------------------------------POST----------------------------------------------------

userRouter.post(routes.registerUser, registerUser);
// ------------------------------------GET----------------------------------------------------
userRouter.post(routes.getAllUser, getAllUser);
userRouter.get(routes.getOneUser, getOneUser);
module.exports = userRouter;
