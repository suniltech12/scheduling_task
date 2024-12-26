const { ScheduleTask } = require("../model/Schedule");
const { User } = require("../model/User");

const scheduleTask = async (req) => {
  try {
    const { adminId, userIds, date, time, comment } = req.body;

    // Validate inputs
    if (
      !adminId ||
      !userIds ||
      !Array.isArray(userIds) ||
      userIds.length === 0
    ) {
      throw new Error("Admin ID and at least one user ID are required.");
    }
    if (!date || !time) {
      throw new Error("Date and time are required.");
    }
    if (comment && comment.length > 200) {
      throw new Error("Comment cannot exceed 200 characters.");
    }

    // Prepare schedule tasks for bulk create
    const scheduleTasks = userIds.map((userId) => ({
      userId,
      adminId,
      date,
      time,
      comment,
    }));

    // Bulk create schedule tasks
    const createdTasks = await ScheduleTask.bulkCreate(scheduleTasks);
    await User.update(
      { isScheduled: true },
      {
        where: {
          id: userIds,
        },
      }
    );
    return {
      status: 201,
      data: createdTasks,
    };
  } catch (error) {
    return {
      status: 400,
      error: error.message,
    };
  }
};
module.exports = {
  scheduleTask,
};
