/**
 * This route collects all the API endpoints.
 */

import express from 'express'
import { updateVideoController } from '../controllers/updateVideoController'
import { authMiddleware } from '../middlewares/auth'

export const apiRouter = express.Router()

apiRouter.use('/', authMiddleware)

apiRouter.post('/update-video', updateVideoController)
