import rateLimit from 'express-rate-limit'

/**
 * Rate limiter middleware to limit the number of requests to the server.
 */
export const rateLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20, // 20 requests in 5 minutes
	standardHeaders: true,
	legacyHeaders: false,
})
