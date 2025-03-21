import type { Response, Request, NextFunction } from 'express'
import { API_KEY } from '../config/env'

/**
 * Middleware to check if the request has a valid API key.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.header('x-api-key')
	if (apiKey === API_KEY) {
		next()
	} else {
		res.status(401).send('Unauthorized')
	}
}
