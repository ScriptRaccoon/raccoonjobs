import express from 'express'
import { rateLimiter } from './middlewares/rateLimit'
import { PORT, RATE_LIMIT } from './config/env'
import { authMiddleware } from './middlewares/auth'
import { updateVideoController } from './controllers/updateVideoController'
import { showAuthURL } from './controllers/authUrlController'
import { showToken } from './controllers/authCallbackController'

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

app.get('/auth', showAuthURL)
app.get('/auth/callback', showToken)

app.use('/api', authMiddleware)
app.post('/api/update-video', updateVideoController)
