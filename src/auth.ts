import type { Response, Request } from 'express'

import { google } from 'googleapis'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './env'

/**
 * Client to authenticate with the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

/**
 * Handles the request to get the authentication URL for the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
export const getAuthURLHandler = async (_req: Request, res: Response) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: ['https://www.googleapis.com/auth/youtube'],
	})

	const html = responseBodyWithURL(authUrl)
	res.status(200).send(html)
}

const responseBodyWithURL = (url: string) =>
	`<body style="max-width: 30rem">
    <h1>Authentication with OAuth2</h1>
    <p>Use the following link to retrieve the access and refresh token.</p>
    <a href="${url}">${url}</a>
</body>`

const CONNECTION_URL = 'https://myaccount.google.com/connections'

/**
 * Handles the request to get the access and refresh token
 * based on the code received from the OAuth2 callback.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
export const getTokenHandler = async (req: Request, res: Response) => {
	const code = req.query.code as string
	try {
		const { tokens } = await oAuth2Client.getToken(code)
		const html = responseBodyWithToken(
			tokens.access_token ?? null,
			tokens.refresh_token ?? null,
		)
		res.status(200).send(html)
	} catch (error) {
		res.status(500).send('Error retrieving tokens')
	}
}

const responseBodyWithToken = (access_token: string | null, refresh_token: string | null) => {
	const warning = refresh_token
		? ''
		: `<p>Refresh token has not been generated again.
			You may revoke access of the existing one under:
			<a href="${CONNECTION_URL}">${CONNECTION_URL}</a></p>`

	return `<body style="max-width:30rem">
	<h1>Tokens have been generated successfully.</h1>
	<h2>Access token:</h2>
	<code style="word-break: break-all;">${access_token}</code>
	<h2>Refresh token:</h2>
	<code style="word-break: break-all;">${refresh_token}</code>
	${warning}</body>`
}
