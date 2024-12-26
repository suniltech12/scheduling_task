const jwt = require("jsonwebtoken");
const { Admin } = require("../model/Admin");
const { encryptPassword, decryptPassword } = require("../utils/passEncryption");

const registerAdmin = async (req) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required.");
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      throw new Error("Admin with this email already exists.");
    }

    const newAdmin = await Admin.create({
      ...req.body,
      password: encryptPassword(password),
    });

    return {
      status: 201,
      data: newAdmin,
    };
  } catch (error) {
    return {
      status: 409,
      error: error.message,
    };
  }
};
const JWT_SECRET = "yourtoken";
const TOKEN_EXPIRATION_TIME = 48 * 60 * 60; // 2 days

const loginAdmin = async (req) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new Error("Invalid email or password.");
    }

    if (decryptPassword(admin.password) !== password) {
      throw new Error("Invalid email or password.");
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION_TIME,
    });

    return {
      status: 200,
      data: {
        message: "Login successful",
        ...admin.dataValues,
        token,
        expiresIn: `${TOKEN_EXPIRATION_TIME / (60 * 60)} hours`,
      },
    };
  } catch (error) {
    return {
      status: 401,
      error: error.message,
    };
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
