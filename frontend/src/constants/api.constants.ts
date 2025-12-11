export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const enum STORAGE_KEYS {
	ACCESS_TOKEN = "access_token",
	REFRESH_TOKEN = "refresh_token"
}
