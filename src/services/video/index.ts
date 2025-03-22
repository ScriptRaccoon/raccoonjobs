import { youtube, type YouTubeVideo } from './youtubeClient'

/**
 * Updates the title of a YouTube video based on its view and like count.
 */
export async function updateVideoTitle(videoID: string): Promise<{
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
		'statistics(viewCount,likeCount),localizations)'

	const response = await youtube.videos.list({
		part: ['snippet', 'statistics', 'localizations'],
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
		console.info('Title is already up to date.')
		return { message: 'Title is already up to date' }
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
		part: ['snippet', 'localizations'],
		requestBody,
	})

	console.info(`Title has been updated.`)

	return { message: 'Title updated' }
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
