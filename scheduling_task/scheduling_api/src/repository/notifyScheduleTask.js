const { Admin } = require("../model/Admin");
const { ScheduleTask } = require("../model/Schedule");
const { User } = require("../model/User");
const { sendEmail } = require("../utils/mailer");
const moment = require("moment");

const fetchSchedule = async () => {
  try {
    const data = await ScheduleTask.findAll({
      include: [
        {
          model: User,
          as: "User",
        },
        {
          model: Admin,
          as: "Admin",
        },
      ],
    });
    return data;
  } catch (error) {
    return error;
  }
};

const sendEmailOneHourBefore = async () => {
  const tasks =await fetchSchedule();
  const now = moment();

  for (const task of tasks) {
    const { User, date, time, comment } = task;
    const taskTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
    const timeDifference = taskTime.diff(now, "minutes");

    if (timeDifference === 60) {
      if (User) {
        await sendEmail(
          User.email,
          "Reminder: 1 Hour Until Your Scheduled Task",
          comment || "You have an upcoming task."
        );
      }
    }
  }
};

const sendEmailThirtyMinutesBefore = async () => {
  const tasks =await fetchSchedule();

  const now = moment();

  for (const task of tasks) {
    const { User, date, time, comment } = task;
    const taskTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
    const timeDifference = taskTime.diff(now, "minutes");
    if (timeDifference === 30) {
      if (User) {
        await sendEmail(
          User.email,
          "Reminder: 30 Minutes Until Your Scheduled Task",
          comment || "You have an upcoming task."
        );
      }
    }
  }
};
const sendEmailFifteenMinutesBefore = async () => {
  const tasks =await fetchSchedule();
  const now = moment();

  for (const task of tasks) {
    const { User, Admin, date, time, comment } = task;
    const taskTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
    const timeDifference = taskTime.diff(now, "minutes");
    if (timeDifference === 5) {
      if (User) {
        await sendEmail(
          User.email,
          "Reminder: 15 Minutes Until Your Scheduled Task",
          comment || "You have an upcoming task."
        );
      }
      if (Admin) {
        await sendEmail(
          Admin.email,
          "Admin Notification: Task Reminder Sent Completed",
          `All Reminder mail send to ${User.email}`
        );
      }
    }
  }
};

module.exports = {
  sendEmailOneHourBefore,
  sendEmailFifteenMinutesBefore,
  sendEmailThirtyMinutesBefore,
};
