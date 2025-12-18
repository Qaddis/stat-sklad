import type { IResponseResult } from "@/types/api.types"
import type { INotification } from "@/types/notifications.types"

import { EndpointsEnum } from "@/constants/api.constants"
import { apiErrorCatch } from "@/utils/api.utils"
import instance from "../api.interceptor"

class NotificationsService {
	async get(): Promise<INotification[]> {
		const response = await instance.get<{ content: INotification[] }>(
			EndpointsEnum.NOTIFICATIONS.GET
		)

		return response.data.content
	}

	async delete(notificationId: string): Promise<IResponseResult<string>> {
		try {
			const response = await instance.delete<string>(
				EndpointsEnum.NOTIFICATIONS.DELETE + notificationId
			)

			return {
				status: response.status,
				data: response.data
			}
		} catch (error) {
			return apiErrorCatch(error)
		}
	}
}

const notificationsService = new NotificationsService()

export default notificationsService
