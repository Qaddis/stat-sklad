import type { IResponseResult } from "@/types/api.types"
import type { IUser, IUserFormData } from "@/types/user.types"

import { EndpointsEnum } from "@/constants/api.constants"
import { apiErrorCatch } from "@/utils/api.utils"
import instance from "../api.interceptor"

class UserService {
	async get() {
		const response = await instance.get<IUser>(EndpointsEnum.USER)

		return response.data
	}

	async changeUserData(data: IUserFormData): Promise<IResponseResult<string>> {
		try {
			const response = await instance.patch<string>(EndpointsEnum.USER, data)

			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return apiErrorCatch(error)
		}
	}
}

const userService = new UserService()

export default userService
