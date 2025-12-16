import axios from "axios"

import { NavigationEnum } from "@/constants/navigation.constants"
import { getContentType, getErrorMsg } from "@/utils/api.utils"
import { getAccessToken, removeTokens } from "./auth.helper"
import authService from "./services/auth.service"

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originReq = error.config

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originReq._isRetry = true

			try {
				await authService.getNewTokens()
				return instance.request(originReq)
			} catch (error) {
				const errorMsg = getErrorMsg(error)

				if (errorMsg.includes("token") || errorMsg.includes("unauthorized")) {
					removeTokens()

					if (typeof window !== "undefined")
						window.location.href = NavigationEnum.LOGIN.SIGN_IN
				}
			}
		}

		return Promise.reject(error)
	}
)

export default instance
