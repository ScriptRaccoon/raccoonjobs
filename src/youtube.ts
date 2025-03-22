import type { Response, Request } from 'express'
import { google, type youtube_v3 } from 'googleapis'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } from './env'

/**
 * Client to authenticate with the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

/**
 * YouTube client to interact with the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */
const youtube = google.youtube({ version: 'v3', auth: oAuth2Client })

type YouTubeVideo = youtube_v3.Schema$Video

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

/**
 * Updates the title of a YouTube video based on its view and like count.
 */
async function updateVideoTitle(videoID: string): Promise<{
	message: string
	success: boolean
}> {
	try {
		console.info('---')
		console.info(`Searching for video with ID ${videoID} ...`)
		const video = await fetchVideoDetails(videoID)

		console.info('Video found.')

		const { message } = await updateTitle(video)

		console.info('---')
		return { message, success: true }
	} catch (error) {
		console.error('Update failed:', error)
		console.info('---')
		return { message: 'Update failed', success: false }
	}
}

/**
 * Fetches the required information about a video.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/list}
 */
async function fetchVideoDetails(videoId: string): Promise<YouTubeVideo> {
	const fields =
		'items(id,snippet(title,categoryId,description,defaultAudioLanguage,defaultLanguage),' +
		'statistics(viewCount,likeCount))'

	const response = await youtube.videos.list({
		part: ['snippet', 'statistics'],
		id: [videoId],
		fields,
	})

	if (!response.data.items?.length) {
		throw new Error('Video not found.')
	}

	return response.data.items[0]
}

/**
 * Updates the title of a video.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/update}
 */
async function updateTitle(video: YouTubeVideo): Promise<{ message: string }> {
	if (!video.snippet) {
		throw new Error('Snippet is missing.')
	}

	const { title, categoryId, description, defaultLanguage, defaultAudioLanguage } = video.snippet

	const oldTitle = title ?? ''

	console.info(`Old title: ${oldTitle}`)

	const newTitle = getNewTitle(video)

	if (title === newTitle) {
		const message = 'Title is already up to date.'
		console.info(message)

		return { message }
	}

	console.info(`New title: ${newTitle}`)

	const requestBody = {
		id: video.id,
		snippet: {
			title: newTitle,
			categoryId,
			description,
			defaultLanguage,
			defaultAudioLanguage,
		},
	}

	await youtube.videos.update({
		part: ['snippet'],
		requestBody,
	})

	console.info(`Title has been updated.`)

	const message = `Title has been updated from '${oldTitle}' to '${newTitle}'.`
	return { message }
}

/**
 * Returns the new title for the video. Since the video
 * is in German, the title is in German as well.
 */
function getNewTitle(video: YouTubeVideo): string {
	const views = video.statistics?.viewCount ?? '0'
	const likes = video.statistics?.likeCount ?? '0'
	return `Dieses Video hat ${views} Aufrufe und ${likes} Likes! (Tutorial)`
}
