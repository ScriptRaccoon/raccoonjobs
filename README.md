# Raccoon Jobs

This is a web service that leverages various endpoints that are called regularly via cron jobs. I have created this in particular to regularly update a YouTube video's title (see below).

## Setup of the repository

1. Clone the repository.
2. Make sure that [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/) are installed.
3. Install the dependencies with `pnpm install`

## Start the application

Run `pnpm start` to start the application.

Run `pnpm dev` to start the application and automatically restart when changes are made in the code.

## Featured Endpoints

### `/api/update-video-title`

This endpoint updates the title of a specified YouTube video by including the current number of views and likes, such as

> This video has 451 views and 24 likes

It is intended to be run regularly. Below you find instructions for the setup. (These will also be used for a tutorial on my YouTube channel.)

#### Setup on Google Cloud

1. Login to your Google account.
2. Open the Google Cloud console at <https://console.cloud.google.com/>
3. Create a new project: <https://console.cloud.google.com/projectcreate>
4. Switch to the project.
5. Open the API library: <https://console.cloud.google.com/apis/library>
6. Search for "YouTube Data API v3" and click on it.
7. Click "Enable" to enable the API for your project.
8. Click "Create credentials".
9. In the prompt which type of data is used, select "User data".
10. Fill in the details for the consent screen (app name, support mail, developer mail).
11. In the scopes section, click "Add or Remove scopes".
12. In the modal, search for "youtube". Select the scope `.../auth/youtube`.
13. Click "Update" to confirm the scopes. Click "Save and Continue".
14. In the application type, select "Web application".
15. Choose a name for the application or keep the default name.
16. In the "Authorized redirect URIs", add `http://localhost:3000/auth/callback`.
17. Download the credentials as a JSON file.
18. In the "Audience" tab of the application, click "Publish app". We do this so that the refresh token, that we will get in a moment, does not expire automatically after 7 days. You do not need to to submit the app to verification.

#### Specify the environment variables

1. In the repository, create a copy `.env` of the file `.env.example`.
2. Open the JSON file and copy the values of `client_id` and `client_secret` from the downloaded JSON file to the `.env` file.
3. Add `http://localhost:3000/auth/callback` as the redirect URI.
4. Create a secure password for your own usage and save it in the `API_KEY` variable. This API key will protect rge service once it is deployed.

#### Retrieve the refresh token

1. Inside the repository, run the script `pnpm start`.
2. Open `http://localhost:3000/auth` and follow the link.
3. Login with the account that manages your YouTube account. In case you have a brand account, you need to choose the brand account.
4. After login, you will be redirected to `http://localhost:3000/auth/callback` and see a refresh token and access token. Notice: In case you already generated a refresh token which has not expired, it will not be included in the response.
5. Copy the refresh token to the `.env` file.

#### Test the endpoint locally

1. Inside the repository, run the script `pnpm start`.
2. Make a PATCH request to `http://localhost:3000/api/update-video-title?videoID=...` with a specified video ID as query parameter and make sure to include the correct API key from the previous steps in the `x-api-key` header.
3. Verify that the video title has been updated.

#### Deploy this Node.js app

Choose any service you like (VPS, Render.com, etc.). You could theoretically even put the Node.js app inside of a SvelteKit project and deploy it to Netlify or Vercel.

#### Create the cron job

One option which costs no money is to create a Google Apps Script (other options have shown to be either not reliable or costing money).

1. Create a new script by opening `script.new` and insert the following script.

```js
function updateVideoTitle() {
	const videoID = '...' // enter your video ID
	const url = `.../api/update-video-title?videoID=${videoID}` // add your deployment URL
	const res = UrlFetchApp.fetch(url, {
		method: 'PATCH',
		headers: {
			'x-api-key': '...', // set your API key
		},
	})
	const txt = res.getContentText()
	console.log(txt)
}
```

2. In the UI, execute the function once and follow the instructions to authenticate the script.

3. Finally, set a [trigger](https://developers.google.com/apps-script/guides/triggers/installable) that runs the function every, say, 10 minutes.

You cannot let it run every 5 minutes: The YouTube Data API allows 10000 quotas for free per day, and one execution of the job requires 51 quotas (namely, 1 for reading the video, and 50 for updating the video), see [Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost). This gives a minimal interval of every 7.344 minutes.
