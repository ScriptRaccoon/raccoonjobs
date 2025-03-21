import { google } from 'googleapis'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../../config/env'

/**
 * Client to authenticate with the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
export const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
