import express from 'express'
import { rateLimiter } from './middlewares/rateLimit'
import { PORT, RATE_LIMIT } from './config/env'
import { authMiddleware } from './middlewares/auth'
import { updateVideoTitleHandler } from './handlers/updateVideo'
import { getAuthURLHandler } from './handlers/getAuthURL'
import { getTokenHandler } from './handlers/getToken'

const app = express()

app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}`)
})

if (RATE_LIMIT === 'true') {
	app.use(rateLimiter)
}

app.get('/health', (_req, res) => {
	res.send('Server is running')
})

app.get('/auth', getAuthURLHandler)
app.get('/auth/callback', getTokenHandler)

app.use('/api', authMiddleware)
app.patch('/api/update-video-title', updateVideoTitleHandler)
