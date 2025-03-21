import { type YouTubeVideo } from './youtubeClient'
import { defaultTemplate, supportedLocales, titleTemplates } from './config'

/**
 * Returns the new title of a video based on its view and like count
 * in a specified locale.
 */
export function getNewTitle(locale: string, video: YouTubeVideo): string {
	const views = video.statistics?.viewCount ?? '0'
	const likes = video.statistics?.likeCount ?? '0'
	const titleTemplate = titleTemplates[locale] ?? defaultTemplate
	return titleTemplate.replace('{views}', views).replace('{likes}', likes)
}

/**
 * Returns the description of a video in a specified locale.
 */
function getDescription(locale: string, video: YouTubeVideo): string {
	return video.localizations?.[locale]?.description ?? ''
}

type Localizations = Record<string, { title: string; description: string }>

/**
 * Returns the localizations for a video in multiple languages.
 */
export function getLocalizations(video: YouTubeVideo): Localizations {
	const localizations: Localizations = {}
	for (const locale of supportedLocales) {
		if (locale === video.snippet?.defaultLanguage) continue
		localizations[locale] = {
			title: getNewTitle(locale, video),
			description: getDescription(locale, video),
		}
	}
	return localizations
}
