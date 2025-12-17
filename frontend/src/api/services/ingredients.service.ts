import type { IResponseResult } from "@/types/api.types"
import type {
	IIngredient,
	IIngredientFormData
} from "@/types/ingredients.types"

import { EndpointsEnum } from "@/constants/api.constants"
import { apiErrorCatch } from "@/utils/api.utils"
import instance from "../api.interceptor"

class IngredientsService {
	async new(data: IIngredientFormData): Promise<IResponseResult<string>> {
		try {
			const response = await instance.post<string>(
				EndpointsEnum.INGREDIENTS.NEW,
				data
			)

			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return apiErrorCatch(error)
		}
	}

	async get(q: string): Promise<IResponseResult<IIngredient[]>> {
		try {
			const response = await instance.get<{ hint_content: IIngredient[] }>(
				EndpointsEnum.INGREDIENTS.HINTS,
				{ params: { q } }
			)

			return {
				status: response.status,
				data: response.data.hint_content
			}
		} catch (error) {
			return apiErrorCatch(error)
		}
	}
}

const ingredientsService = new IngredientsService()

export default ingredientsService
