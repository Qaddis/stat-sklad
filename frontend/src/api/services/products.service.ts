import type { ActionTypeEnum, IActionFormData } from "@/types/actions.types"
import type { IResponseResult } from "@/types/api.types"

import { EndpointsEnum } from "@/constants/api.constants"
import { apiErrorCatch } from "@/utils/api.utils"
import instance from "../api.interceptor"

class ProductsService {
	async action(
		actionType: keyof typeof ActionTypeEnum,
		data: IActionFormData
	): Promise<IResponseResult<string>> {
		const url = EndpointsEnum.ACTIONS[actionType]

		try {
			const response = await instance.post<string>(url, data)

			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return apiErrorCatch(error)
		}
	}
}

const productsService = new ProductsService()

export default productsService
