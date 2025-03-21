import type { Response, Request } from 'express'
import { oAuth2Client } from '../services/auth'

/**
 * Handles the request to show the authentication URL for the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
export const showAuthURL = async (_req: Request, res: Response) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: ['https://www.googleapis.com/auth/youtube'],
	})

	res.send(responseBodyWithURL(authUrl))
}

const responseBodyWithURL = (url: string) =>
	`<body style="max-width: 30rem">
    <h1>Authentication with OAuth2</h1>
    <p>Use the following link to retrieve the access and refresh token.</p>
    <a href="${url}">${url}</a>
</body>`
