const CronJob = require("cron").CronJob;
const fetchGitHubJobs = require("../worker/tasks/github-jobs-api");

// Fetch every minute, cron job
new CronJob("1 * * * * *", fetchGitHubJobs, null, true, "America/Los_Angeles");
