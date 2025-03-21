import { supportedLocales } from './config'
import { getLocalizations, getNewTitle } from './utils'
import { youtube, YouTubeVideo } from './youtubeClient'

/**
 * Updates the title of a YouTube video based on its view and like count.
 */
export async function updateVideoTitle(videoID: string): Promise<{
	message: string
	oldTitle: string | null
	newTitle: string | null
}> {
	try {
		console.info(`Searching for video with ID ${videoID} ...`)
		const video = await fetchVideoDetails(videoID)

		console.info('Video found.')

		const { message, oldTitle, newTitle } = await updateTitle(video)

		return { message, oldTitle, newTitle }
	} catch (error) {
		console.error('Error updating video:', error)
		return { message: 'Video could not be updated', oldTitle: null, newTitle: null }
	}
}

/**
 * Fetches all the required information about a video.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/list}
 */
async function fetchVideoDetails(videoId: string): Promise<YouTubeVideo> {
	const fields =
		'items(id,snippet(title,categoryId,description,defaultAudioLanguage,defaultLanguage),statistics(viewCount,likeCount),localizations)'

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
 * Updates the title of a video. Includes translations in multiple languages.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/update}
 * Returns the new default title if the title has been updated successfully.
 */
async function updateTitle(
	video: YouTubeVideo,
): Promise<{ message: string; oldTitle: string; newTitle: string }> {
	if (!video.snippet) {
		throw new Error('Snippet is missing.')
	}

	const { title, categoryId, description, defaultAudioLanguage, defaultLanguage } = video.snippet

	const oldTitle = title ?? ''

	console.info(`Old title: ${oldTitle}`)

	if (!defaultLanguage) {
		throw new Error('Default language is missing.')
	}

	const newTitle = getNewTitle(defaultLanguage, video)

	if (title === newTitle) {
		console.info('Title is already up to date.')
		return { message: 'Title is already up to date', oldTitle, newTitle }
	}

	console.info(`New title: ${newTitle}`)

	const requestBody = {
		id: video.id,
		snippet: {
			title: getNewTitle(defaultLanguage, video),
			categoryId,
			description,
			defaultAudioLanguage,
			defaultLanguage,
		},
		localizations: getLocalizations(video),
	}

	await youtube.videos.update({
		part: ['snippet', 'localizations'],
		requestBody,
	})

	console.info(`Title has been updated in ${supportedLocales.length} languages.`)

	return { message: 'Title has been updated', oldTitle, newTitle }
}
