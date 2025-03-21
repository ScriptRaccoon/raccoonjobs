import express from 'express'
import { apiRouter } from './routers/api'
import { authRouter } from './routers/auth'
import { rateLimiter } from './middlewares/rateLimit'
import { PORT, RATE_LIMIT } from './config/env'

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

app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.post('/test', (req, res) => {
	res.send('Hello World')
})
