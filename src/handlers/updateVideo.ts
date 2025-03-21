import type { Response, Request } from 'express'
import { updateVideoTitle } from '../services/video'

/**
 * Handles the request to update a video's title.
 */
export const updateVideoTitleHandler = async (req: Request, res: Response) => {
	const videoID = req.query.videoID

	if (!videoID) {
		res.status(400).send({ error: 'Missing video ID' })
		return
	}

	const { message, success } = await updateVideoTitle(String(videoID))

	const statusCode = success ? 200 : 500
	res.status(statusCode).send({ message })
}
