const options: Intl.DateTimeFormatOptions = {
	timeZone: "Europe/Moscow",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	hour12: false
}

export const formatDate = (utcDate: string): string =>
	new Date(utcDate).toLocaleString("ru-RU", options)
