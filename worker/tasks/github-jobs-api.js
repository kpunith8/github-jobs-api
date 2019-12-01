const fetch = require("node-fetch");
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");

// Promisify the redis sync get and set functions to use it with async JS
const setAsync = promisify(client.set).bind(client);

const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithubJobs() {
  let resultCount = 1;
  let page = 1;
  let allJobs = [];

  // fetch all pages
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${page}`);
    const jobs = await res.json();
    console.log(`Jobs fetched for ${page}: ${jobs.length}`);
    allJobs = [...allJobs, ...jobs]; // use push(...jobs), which mutates the array
    resultCount = jobs.length;
    page++;
  }

  console.log("Total Jobs:", allJobs.length);

  // filterring logic
  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    return (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    );
  });

  console.log("Junior Jobs:", jrJobs.length);

  // set in redis
  const success = await setAsync("github", JSON.stringify(jrJobs));

  console.log({ success });
}

// Keep this one for testing to execute this file separately
fetchGithubJobs();

module.exports = fetchGithubJobs;
