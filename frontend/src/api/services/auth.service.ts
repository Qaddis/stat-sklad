import axios from "axios"

import type { IResponseResult } from "@/types/api.types"
import type {
	IAuthResponse,
	ISignInFormData,
	ISignUpFormData
} from "@/types/auth.types"

import { API_URL, EndpointsEnum } from "@/constants/api.constants"
import { apiErrorCatch, getContentType } from "@/utils/api.utils"
import { getRefreshToken, saveTokens, saveToStorage } from "../auth.helper"

class AuthService {
	async signIn(data: ISignInFormData): Promise<IResponseResult<IAuthResponse>> {
		try {
			const response = await axios.post<IAuthResponse>(
				API_URL + EndpointsEnum.AUTH.SIGN_IN,
				data,
				{
					headers: getContentType()
				}
			)

			saveToStorage(response.data)

			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return apiErrorCatch(error)
		}
	}

	async signUp(data: ISignUpFormData): Promise<IResponseResult<IAuthResponse>> {
		try {
			const response = await axios.post<IAuthResponse>(
				API_URL + EndpointsEnum.AUTH.SIGN_UP,
				data,
				{
					headers: getContentType()
				}
			)

			saveToStorage(response.data)

			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return apiErrorCatch<IAuthResponse>(error)
		}
	}

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
