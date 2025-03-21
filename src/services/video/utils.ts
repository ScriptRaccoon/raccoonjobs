import { type YouTubeVideo } from './youtubeClient'
import { defaultTemplate, supportedLocales, titleTemplates } from './config'

/**
 * Returns the new title of a video based on its view and like count
 * in a specified locale.
 */
export function getNewTitle(locale: string, video: YouTubeVideo): string {
	const views = String(video.statistics?.viewCount ?? '0')
	const likes = String(video.statistics?.likeCount ?? '0')
	const titleTemplate = titleTemplates[locale] ?? defaultTemplate
	return titleTemplate.replace('{views}', views).replace('{likes}', likes)
}

/**
 * Returns the description of a video in a specified locale.
 */
function getDescription(locale: string, video: YouTubeVideo): string {
	return video.localizations?.[locale]?.description ?? ''
}

/**
 * Returns the localizations for a video in multiple languages.
 */
export function getLocalizations(video: YouTubeVideo) {
	const localizations: Record<string, { title: string; description: string }> = {}
	for (const locale of supportedLocales) {
		if (locale === video.snippet?.defaultLanguage) continue
		localizations[locale] = {
			title: getNewTitle(locale, video),
			description: getDescription(locale, video),
		}
	}
	return localizations
}
