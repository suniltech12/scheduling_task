const express = require("express");

const routes = require("../utils/routes");
const { scheduleTask } = require("../controller/Schedule");

const scheduleRoute = express.Router();

scheduleRoute.post(routes.scheduleCreate, scheduleTask);

module.exports = scheduleRoute;
