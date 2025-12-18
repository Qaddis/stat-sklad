import {
	IActionExt,
	type IAction,
	type IPaginatedActions
} from "@/types/actions.types"

import { EndpointsEnum } from "@/constants/api.constants"
import instance from "../api.interceptor"

class HistoryService {
	async getAll(
		page: number,
		size: number,
		dateFrom: string,
		dateTo: string
	): Promise<IPaginatedActions> {
		const response = await instance.get<IPaginatedActions>(
			EndpointsEnum.HISTORY.ALL,
			{
				params: {
					page,
					size,
					date_from: dateFrom ? new Date(dateFrom).toISOString() : "",
					date_to: dateTo ? new Date(dateTo).toISOString() : ""
				}
			}
		)

		return response.data
	}

	async getLatest(): Promise<IAction[]> {
		const response = await instance.get<{ content: IAction[] }>(
			EndpointsEnum.HISTORY.LAST
		)

		return response.data.content
	}

	async getById(actionId: string): Promise<IActionExt> {
		const response = await instance.get<IActionExt>(
			EndpointsEnum.HISTORY.ACTION + actionId
		)

		return response.data
	}
}

const historyService = new HistoryService()

export default historyService
