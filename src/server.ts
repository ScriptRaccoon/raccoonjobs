import express from 'express'
import { apiRouter } from './routers/api'
import { rateLimiter } from './middlewares/rateLimit'
import { config } from 'dotenv'
config()

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}`)
})

if (process.env.RATE_LIMIT === 'true') {
	app.use(rateLimiter)
}

app.get('/health', (_req, res) => {
	res.send('Server is running')
})

app.use('/api', apiRouter)
