import express from 'express'
import { apiRouter } from './routers/api'

import { config } from 'dotenv'
config()

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}`)
})

app.use('/api', apiRouter)
