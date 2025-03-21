export const defaultTemplate = 'This video has {views} views and {likes} likes! (Tutorial)' // Default

export const titleTemplates: Partial<Record<string, string>> = {
	'ar-SA': 'هذا الفيديو لديه {views} مشاهدة و {likes} إعجاب! (Tutorial)', // Arabic
	'bn-BD': 'এই ভিডিওটি {views} বার দেখা হয়েছে এবং {likes} লাইক পেয়েছে! (Tutorial)', // Bengali
	'de-DE': 'Dieses Video wurde {views} mal gesehen und hat {likes} Likes! (Tutorial)', // German
	'en-US': 'This video has {views} views and {likes} likes! (Tutorial)', // English
	'es-ES': '¡Este video tiene {views} vistas y {likes} me gusta! (Tutorial)', // Spanish
	'fa-IR': 'این ویدیو {views} بازدید و {likes} لایک دارد! (Tutorial)', // Persian
	'fr-FR': 'Cette vidéo a été vue {views} fois et a reçu {likes} mentions "J\'aime" ! (Tutorial)', // French
	'hi-IN': 'इस वीडियो को {views} बार देखा गया है और {likes} लाइक्स मिले हैं! (Tutorial)', // Hindi
	'it-IT': 'Questo video ha {views} visualizzazioni e {likes} mi piace! (Tutorial)', // Italian
	'ja-JP': 'このビデオは{views}回視聴され、{likes}件の「いいね」があります！ (Tutorial)', // Japanese
	'ko-KR': '이 비디오는 {views}회 조회되었으며 {likes}개의 좋아요를 받았습니다! (Tutorial)', // Korean
	'mr-IN': 'या व्हिडिओला {views} वेळा पाहिले गेले आहे आणि {likes} लाईक्स मिळाले आहेत! (Tutorial)', // Marathi
	'nl-NL': 'Deze video is {views} keer bekeken en heeft {likes} likes! (Tutorial)', // Dutch
	'pt-BR': 'Este vídeo tem {views} visualizações e {likes} curtidas! (Tutorial)', // Portuguese
	'ru-RU': 'Это видео посмотрели {views} раз и оно набрало {likes} лайков! (Tutorial)', // Russian
	'ta-IN': 'இந்த வீடியோவை {views} முறை பார்த்து {likes} விருப்பம் பெற்றுள்ளது! (Tutorial)', // Tamil
	'te-IN': 'ఈ వీడియోను {views} సార్లు చూశారు మరియు {likes} లైక్‌లు పొందాయి! (Tutorial)', // Telugu
	'tr-TR': 'Bu video {views} kez izlendi ve {likes} beğeni aldı! (Tutorial)', // Turkish
	'ur-PK': 'اس ویڈیو کو {views} بار دیکھا گیا ہے اور {likes} لائکس ملے ہیں! (Tutorial)', // Urdu
	'vi-VN': 'Video này có {views} lượt xem và {likes} lượt thích! (Tutorial)', // Vietnamese
	'zh-CN': '这个视频已观看{views}次，获得了{likes}个赞！(Tutorial)', // Chinese (China)
	'zh-TW': '這部影片已觀看{views}次，並獲得{likes}個讚 (Tutorial)', // Chinese (Taiwan)
} satisfies Record<`${Lowercase<string>}-${Uppercase<string>}`, string>

export const supportedLocales = Object.keys(titleTemplates)
