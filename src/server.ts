import express from 'express'
import { PORT, RATE_LIMIT } from './env'
import { authMiddleware, rateLimiter } from './middleware'
import { getAuthURLHandler, getTokenHandler } from './auth'
import { updateVideoTitleHandler } from './youtube'

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
