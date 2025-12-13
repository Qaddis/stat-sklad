import axios from "axios"

import { API_URL, EndpointsEnum } from "@/constants/api.constants"
import type { IAuthResponse } from "@/types/auth.types"
import { getContentType } from "@/utils/api.utils"
import { getRefreshToken, saveTokens } from "../auth.helper"

class AuthService {
	async signIn() {}

	async signUp() {}

	async getNewTokens(): Promise<void> {
		const refreshToken = getRefreshToken()

		if (!refreshToken) {
			throw new Error("No refresh token available")
		}

		const response = await axios.post<IAuthResponse>(
			API_URL + EndpointsEnum.AUTH.REFRESH,
			{
				refresh_token: refreshToken
			},
			{
				headers: getContentType()
			}
		)

		if (response.status === 200)
			saveTokens({
				access_token: response.data.access_token,
				refresh_token: response.data.refresh_token
			})
	}
}

const authService = new AuthService()

export default authService
