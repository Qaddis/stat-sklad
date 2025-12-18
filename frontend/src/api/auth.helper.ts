import Cookies from "js-cookie"

import { STORAGE_KEYS } from "@/constants/api.constants"
import type { IAuthResponse, ITokens } from "@/types/auth.types"

export const getAccessToken = (): string | null => {
	return Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) || null
}

export const getRefreshToken = (): string | null => {
	return Cookies.get(STORAGE_KEYS.REFRESH_TOKEN) || null
}

export const saveTokens = (data: ITokens): void => {
	const options: Cookies.CookieAttributes = { expires: 30 }

	Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, data.access_token, options)
	Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token, options)
}

export const removeTokens = (): void => {
	Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN)
	Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN)
}

export const getUserFromStorage = (): string | null => {
	return localStorage.getItem("user")
}

export const saveToStorage = (data: IAuthResponse): void => {
	saveTokens({
		access_token: data.access_token,
		refresh_token: data.refresh_token
	})

	localStorage.setItem("user", data.user_id)
}
