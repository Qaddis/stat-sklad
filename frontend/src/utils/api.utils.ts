import axios from "axios"

import { IResponseResult } from "@/types/api.types"

export const getContentType = () => ({
	"Content-Type": "application/json"
})

export const getErrorMsg = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data

		if (data && Array.isArray(data.detail)) {
			const firstError = data.detail[0]

			if (typeof firstError === "object" && firstError.msg)
				return String(firstError.msg)
		}

		if (data && typeof data.detail === "string") return data.detail

		if (data && typeof data.message === "string") return data.message

		if (data && Array.isArray(data.message))
			return data.message[0] || "Ошибка запроса"

		if (data && typeof data === "object") return "Ошибка сервера"
	}

	return "Произошла неизвестная ошибка"
}

export const apiErrorCatch = <T>(error: unknown): IResponseResult<T> => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status || 500
		const msg = getErrorMsg(error)

		return {
			status,
			error: msg
		}
	}

	return {
		status: 502,
		error: error instanceof Error ? error.message : "Unexpected error"
	}
}
