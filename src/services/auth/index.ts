import { config } from 'dotenv'
import { google } from 'googleapis'

config()

/**
 * Client to authenticate with the YouTube API.
 */
export const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
)
