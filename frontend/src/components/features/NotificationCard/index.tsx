"use client"

import { Delete } from "@mui/icons-material"
import NotificationIcon from "@mui/icons-material/Notifications"
import type { QueryObserverResult } from "@tanstack/react-query"

import notificationsService from "@/api/services/notifications.service"
import type { INotification } from "@/types/notifications.types"
import { formatDate } from "@/utils/datetime.utils"

import styles from "./NotificationCard.module.scss"

interface IProps {
	id: string
	title: string
	description: string
	date: string
	refetch: () => Promise<QueryObserverResult<INotification[], Error>>
}

export default function NotificationCard({
	id,
	title,
	description,
	date,
	refetch
}: IProps) {
	const deleteNotification = async (): Promise<void> => {
		const response = await notificationsService.delete(id)

		if (response.status === 200) refetch()
		else window.alert(`Ошибка! ${response.error!}`)
	}

	return (
		<article className={styles["notification-card"]}>
			<NotificationIcon />

			<div className={styles.info}>
				<h4 className={styles.heading}>{title}</h4>
				<span className={styles.date}>{formatDate(date)}</span>

				<p className={styles.description}>{description}</p>
			</div>

			<button onClick={deleteNotification} className={styles["delete-btn"]}>
				<Delete />
			</button>
		</article>
	)
}
