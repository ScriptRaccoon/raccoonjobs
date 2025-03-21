import type { Response, Request } from 'express'
import { updateVideoTitle } from '../services/video'

/**
 * Handles the request to update a video's title.
 */
export const updateVideoController = async (req: Request, res: Response) => {
	const videoID = req.query.videoID

	if (!videoID) {
		res.status(400).send({ error: 'Missing video ID' })
		return
	}

	const { message, oldTitle, newTitle } = await updateVideoTitle(String(videoID))

	if (!newTitle) {
		res.status(500).send({ error: 'Error updating video' })
		return
	}

	res.send({ message, oldTitle, newTitle })
}
