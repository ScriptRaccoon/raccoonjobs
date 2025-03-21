import express from 'express'
import { rateLimiter } from './middlewares/rateLimit'
import { PORT, RATE_LIMIT } from './config/env'
import { authMiddleware } from './middlewares/auth'
import { updateVideo } from './handlers/updateVideo'
import { getAuthURL } from './handlers/getAuthURL'
import { getToken } from './handlers/getToken'

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

app.get('/auth', getAuthURL)
app.get('/auth/callback', getToken)

app.use('/api', authMiddleware)
app.post('/api/update-video', updateVideo)
