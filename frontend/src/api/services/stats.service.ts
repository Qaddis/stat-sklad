import type {
	IProductsStatsData,
	ISuppliesStatsData
} from "@/types/stats.types"

import { EndpointsEnum } from "@/constants/api.constants"
import instance from "../api.interceptor"

class StatsService {
	async getProductsStat(): Promise<IProductsStatsData> {
		const response = await instance.get<IProductsStatsData>(
			EndpointsEnum.STATS.PRODUCTS
		)

		return response.data
	}

	async getSuppliesStat(): Promise<ISuppliesStatsData> {
		const response = await instance.get<ISuppliesStatsData>(
			EndpointsEnum.STATS.SUPPLIES
		)

		return response.data
	}
}

const statsService = new StatsService()

export default statsService
