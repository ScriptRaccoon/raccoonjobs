# Raccoon Jobs

This is a web service that leverages various endpoints that are called regularly via <https://cron-job.org>.

## Setup of the repository

1. Clone this repository.
2. Make sure that [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/) are installed.
3. Install the dependencies with `pnpm install`

## Start the application

Run `pnpm start` to start the application.

Run `pnpm dev` to start the application and automatically restart when changes are mode in the code.

## Featured Endpoints

### Update Video Title

This endpoint automatically updates the title of a specified YouTube video by including the current number of views and likes. For details see the [**README**](/src/services/video/README.md).
