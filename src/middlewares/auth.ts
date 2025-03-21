import type { Response, Request, NextFunction } from 'express'

/**
 * Middleware to check if the request has a valid API key.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.header('x-api-key')
	if (apiKey === process.env.API_KEY) {
		next()
	} else {
		res.status(401).send('Unauthorized')
	}
}
