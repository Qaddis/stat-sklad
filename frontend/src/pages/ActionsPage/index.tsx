"use client"

import {
	History,
	InventoryOutlined,
	RemoveCircleOutline
} from "@mui/icons-material"

import ActionLink from "@/components/features/ActionLink"
import PageHeading from "@/components/ui/PageHeading"
import { NavigationEnum } from "@/constants/navigation.constants"

import styles from "./ActionsPage.module.scss"

export default function ActionsPage() {
	return (
		<div className={styles.page}>
			<PageHeading>Действия</PageHeading>

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
					to={NavigationEnum.ACTIONS.HISTORY.ALL}
					title="История действий"
					icon={History}
				/>
			</nav>
		</div>
	)
}
