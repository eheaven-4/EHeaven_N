const CronJob = require('cron').CronJob;
const Cron = require('./db-backup.js');


// AutoBackUp every week (at 00:00 on Sunday)
new CronJob(
  '* * * * *',
  function() {
    Cron.dbAutoBackUp();
  },
  null,
  true,
  'America/New_York'
);