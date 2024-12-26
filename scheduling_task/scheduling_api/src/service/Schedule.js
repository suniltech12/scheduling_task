const repo = require("../repository/Schedule");

const scheduleTask = async (req) => repo.scheduleTask(req);

module.exports = {
  scheduleTask,
};
