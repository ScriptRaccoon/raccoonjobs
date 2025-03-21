/**
 * This route generates the access and refresh token for the YouTube API.
 */

import express from 'express'
import { showAuthURL } from '../controllers/authUrlController'
import { showToken } from '../controllers/authCallbackController'

export const authRouter = express.Router()

authRouter.get('/', showAuthURL)
authRouter.get('/callback', showToken)
