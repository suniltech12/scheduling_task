const repo = require("../repository/User");

const registerUser = async (req) => repo.registerUser(req);

const getAllUser = async (req) => repo.getAllUser(req);

const getOneUser = async (req) => repo.getOneUser(req);

module.exports = {
  registerUser,
  getAllUser,
  getOneUser,
};
