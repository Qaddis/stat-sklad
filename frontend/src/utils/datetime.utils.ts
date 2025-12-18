const options: Intl.DateTimeFormatOptions = {
	timeZone: "Europe/Moscow",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	hour12: false
}

export const formatDate = (utcDate: string): string => {
	const date = new Date(utcDate)

	date.setHours(date.getHours() + 3)

	return date.toLocaleString("ru-RU", options)
}
