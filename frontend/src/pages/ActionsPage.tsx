"use client"

import {
	History,
	InventoryOutlined,
	RemoveCircleOutline
} from "@mui/icons-material"

import ActionLink from "@/components/features/ActionLink"
import PageHeader from "@/components/ui/PageHeader"
import { NavigationEnum } from "@/constants/navigation.constants"

import styles from "./ActionsPage.module.scss"

export default function ActionsPage() {
	return (
		<div className={styles.page}>
			<PageHeader>Действия</PageHeader>

			<nav className={styles["actions-links"]}>
				<ActionLink
					to={NavigationEnum.ACTIONS.NEW_SUPPLY}
					title="Новая поставка"
					icon={InventoryOutlined}
				/>
				<ActionLink
					to={NavigationEnum.ACTIONS.WRITE_OFF}
					title="Списать со склада"
					icon={RemoveCircleOutline}
				/>
				<ActionLink
					to={NavigationEnum.ACTIONS.HISTORY}
					title="История операций"
					icon={History}
				/>
			</nav>
		</div>
	)
}
