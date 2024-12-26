const cron = require('node-cron');
const {
    sendEmailOneHourBefore,
    sendEmailFifteenMinutesBefore,
    sendEmailThirtyMinutesBefore,
} = require('./notifyScheduleTask');

const jobScheduler = () => {
  cron.schedule('* * * * *', () => {
    sendEmailOneHourBefore();
  });
  cron.schedule('* * * * *', () => {
    sendEmailFifteenMinutesBefore();
  });
  cron.schedule('* * * * *', () => {
    sendEmailThirtyMinutesBefore();
  });
};

module.exports = { jobScheduler };
