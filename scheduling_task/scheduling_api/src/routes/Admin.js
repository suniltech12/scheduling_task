const express = require("express");

const routes = require("../utils/routes");
const { registerAdmin, loginAdmin } = require("../controller/Admin");

const adminRoute = express.Router();

// ------------------------------------POST----------------------------------------------------

adminRoute.post(routes.registerAdmin, registerAdmin);
adminRoute.post(routes.login, loginAdmin);

module.exports = adminRoute;
