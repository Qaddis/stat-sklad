import axios from "axios"

import { API_URL } from "@/constants/api.constants"
import type { IAuthResponse } from "@/types/auth.types"
import { getContentType } from "@/utils/api.utils"
import { getRefreshToken, saveTokens } from "../auth.helper"

class AuthService {
	async signIn() {}

	async signUp() {}

	async getNewTokens(): Promise<void> {
		const refreshToken = getRefreshToken()

		const response = await axios.post<IAuthResponse>(
			API_URL + "/auth/refresh",
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

export default new AuthService()
