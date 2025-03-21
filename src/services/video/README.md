# Video service

This service leverages a function (`updateVideoTitle`) that updates the title of a specified YouTube video by including the current number of views and likes. It uses the YouTube Data API to edit the video title.

Below you find instructions for the setup.

## Setup on Google Cloud

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

## Specify the environment variables

1. In the repository, create a copy `.env` of the file `.env.example`.
2. Open the JSON file and copy the values of `client_id` and `client_secret` from the downloaded JSON file to the `.env` file.
3. Add `http://localhost:3000/auth/callback` as the redirect URI.
4. Create a secure password for your own usage and save it in the `API_KEY` variable. This API key will protect your service once you deploy it.

## Retrieve the refresh token

1. Inside the repository, run the script `pnpm start`.
2. Open `http://localhost:3000/auth` and follow the link.
3. Login with the account that manages your YouTube account. In case you have a brand account, you need to choose the brand account.
4. After login, you will be redirected to `http://localhost:3000/auth/callback` and see a refresh token and access token. Notice: In case you already generated a refresh token which has not expired, it will not be included in the response.
5. Copy the refresh token to the `.env` file.

## Test the endpoint locally

1. Inside the repository, run the script `pnpm start`.
2. Make a POST request to `http://localhost:3000/api/update-video-title?videoID=...` with a specified video ID as query parameter and make sure to include the correct API key from the previous steps in the `x-api-key` header.
3. Verify that the video title has been updated.
