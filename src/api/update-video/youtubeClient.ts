/**
 * This file creates the YouTube client.
 * See {@link https://www.npmjs.com/package/googleapis}
 */

import { google, type youtube_v3 } from 'googleapis'
import { config } from 'dotenv'
config()

const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI,
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

export const youtube = google.youtube({ version: 'v3', auth: oAuth2Client })

export type YouTubeVideo = youtube_v3.Schema$Video
