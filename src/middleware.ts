import type { Response, Request, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import { API_KEY } from './env'

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

/**
 * Rate limiter middleware to limit the number of requests to the server.
 */
export const rateLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20, // 20 requests in 5 minutes
	standardHeaders: true,
	legacyHeaders: false,
})
