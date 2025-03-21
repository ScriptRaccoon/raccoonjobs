/**
 * Environment variables
 */

import { config } from 'dotenv'
config()

export const CLIENT_ID = process.env.CLIENT_ID ?? ''
export const CLIENT_SECRET = process.env.CLIENT_SECRET ?? ''
export const REDIRECT_URI = process.env.REDIRECT_URI ?? ''
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? ''
export const API_KEY = process.env.API_KEY ?? ''
export const RATE_LIMIT = process.env.RATE_LIMIT ?? 'false'
export const PORT = process.env.PORT ?? 3000
