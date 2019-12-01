## Reference

- [Original Code Base](https://github.com/aj-4/100m-startup)
- [FreecodeCamp Video](https://www.youtube.com/watch?v=lauywdXKEXI)
- [Github Jobs API](https://jobs.github.com/positions.json)

## Tools needed

- Install `redis` on your machine before proceeding

## Libraries used

- `redis` - For in-memory data storage
- `express` - To serve the data or `api` end point
- `react` - UI and state management, with the help of `create-react-app` boilerplate
- `material-ui` - CSS library [Material-ui](https://material-ui.com/)
- `cron` - To run the job in background to poll the github pages every minute for latest data

## How to use

- Clone the project

- First, run the cron job to get all the data from github's API.
```
$ node worker/index.js # which runs every minute to fecth the data from the API
```

- Once the data copied to `redis` local server, run the `express` server
```
$ node api/index.js
```

- Once the server is up and running test whether API end point is working

- Clone client app https://github.com/kpunith8/github-jobs-client

- Finally start the react app in development, goto `github-jobs-client`  project and run
```
$ npm start
```