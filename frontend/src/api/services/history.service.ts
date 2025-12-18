import type { IAction } from "@/types/actions.types"

import { EndpointsEnum } from "@/constants/api.constants"
import instance from "../api.interceptor"

class HistoryService {
	async getAll() {}

	async getLatest(): Promise<IAction[]> {
		const response = await instance.get<{ content: IAction[] }>(
			EndpointsEnum.HISTORY.LAST
		)

		return response.data.content
	}

	async getById() {}
}

const historyService = new HistoryService()

export default historyService
