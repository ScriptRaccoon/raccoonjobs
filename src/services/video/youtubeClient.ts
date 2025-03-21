import { google, type youtube_v3 } from 'googleapis'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } from '../../config/env'

/**
 * Client to authenticate with the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

/**
 * YouTube client to interact with the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
export const youtube = google.youtube({ version: 'v3', auth: oAuth2Client })

export type YouTubeVideo = youtube_v3.Schema$Video
