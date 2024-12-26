const repo = require('../repository/notifyScheduleTask');

const sendEmailOneHourBefore = async () => {
  await repo.sendEmailOneHourBefore();
};
const sendEmailFifteenMinutesBefore = async () => {
  await repo.sendEmailFifteenMinutesBefore();
};
const sendEmailThirtyMinutesBefore = async () => {
  await repo.sendEmailThirtyMinutesBefore();
};
module.exports = {
  sendEmailOneHourBefore,
  sendEmailFifteenMinutesBefore,
  sendEmailThirtyMinutesBefore,
};
