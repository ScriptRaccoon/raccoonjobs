import express from 'express'
import { updateVideoHandler } from '../api/update-video/requestHandler'
import { authMiddleware } from '../middlewares/auth'

export const apiRouter = express.Router()

apiRouter.use('/', authMiddleware)

apiRouter.get('/update-video', updateVideoHandler)
