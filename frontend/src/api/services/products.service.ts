import type { ActionTypeEnum, IActionFormData } from "@/types/actions.types"
import type { IResponseResult } from "@/types/api.types"
import type { IPaginateProducts } from "@/types/products.types"

import { EndpointsEnum } from "@/constants/api.constants"
import { apiErrorCatch } from "@/utils/api.utils"
import instance from "../api.interceptor"

class ProductsService {
	async get(size: number, page: number, q: string): Promise<IPaginateProducts> {
		const response = await instance.get<IPaginateProducts>(
			EndpointsEnum.PRODUCTS,
			{ params: { size, page, q } }
		)

		return response.data
	}

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
