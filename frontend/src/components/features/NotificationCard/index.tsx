"use client"

import { formatDate } from "@/utils/datetime.utils"
import NotificationIcon from "@mui/icons-material/Notifications"

import styles from "./NotificationCard.module.scss"

interface IProps {
	title: string
	description: string
	date: string
}

export default function NotificationCard({ title, description, date }: IProps) {
	return (
		<article className={styles["notification-card"]}>
			<NotificationIcon />

			<div className={styles.info}>
				<h4 className={styles.heading}>{title}</h4>
				<span className={styles.date}>{formatDate(date)}</span>

				<p className={styles.description}>{description}</p>
			</div>
		</article>
	)
}
