/**
 * This file creates the YouTube client.
 * See {@link https://www.npmjs.com/package/googleapis}
 */

import { google, type youtube_v3 } from 'googleapis'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } from '../../config/env'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export const youtube = google.youtube({ version: 'v3', auth: oAuth2Client })

export type YouTubeVideo = youtube_v3.Schema$Video
