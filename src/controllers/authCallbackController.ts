import type { Response, Request } from 'express'
import { oAuth2Client } from '../services/auth'

const CONNECTION_URL = 'https://myaccount.google.com/connections'

/**
 * Handles the request to show the access and refresh token
 * based on the code received from the OAuth2 callback.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
export const showToken = async (req: Request, res: Response) => {
	const code = req.query.code as string
	try {
		const { tokens } = await oAuth2Client.getToken(code)
		res.send(responseBodyWithToken(tokens.access_token ?? null, tokens.refresh_token ?? null))
	} catch (error) {
		res.status(500).send('Error retrieving tokens')
	}
}

const responseBodyWithToken = (access_token: string | null, refresh_token: string | null) =>
	`<body style="max-width:30rem">
        <h1>Tokens have been generated successfully.</h1>
        <h2>Access token:</h2>
        <code style="word-break: break-all;">${access_token}</code>
        <h2>Refresh token:</h2>
        <code style="word-break: break-all;">${refresh_token}</code>` +
	(refresh_token
		? ''
		: `<p>Refresh token has not been generated again.
          You may revoke access of the existing one under:
          <a href="${CONNECTION_URL}">${CONNECTION_URL}</a></p>`) +
	`</body>`
