const repo = require("../repository/Admin");

const registerAdmin = async (req) => repo.registerAdmin(req);
const loginAdmin = async (req) => repo.loginAdmin(req);

module.exports = {
  registerAdmin,
  loginAdmin,
};
