const { User } = require("../model/User");
const { sendEmailOneHourBefore } = require("./notifyScheduleTask");

const registerUser = async (req) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error(" email are required.");
    }

    const existingAdmin = await User.findOne({ where: { email } });
    if (existingAdmin) {
      throw new Error("User with this email already exists.");
    }

    const newUser = await User.create(req.body);
    return {
      status: 201,
      data: newUser,
    };
  } catch (error) {
    return {
      status: 409,
      error: error.message,
    };
  }
};

const getAllUser = async (req) => {
  try {
    const { adminId } = req.body;
    if (!adminId) {
      throw new Error("Admin ID is required.");
    }
    const users = await User.findAll({
      where: {
        adminId,
        isScheduled: false,
      },
    });

    return {
      status: 200,
      data: users,
    };
  } catch (error) {
    return {
      status: 404,
      error: error.message,
    };
  }
};
const getOneUser = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("User ID is required.");
    }

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      status: 200,
      data: user,
    };
  } catch (error) {
    return {
      status: 404,
      error: error.message,
    };
  }
};
module.exports = {
  registerUser,
  getAllUser,
  getOneUser,
};
