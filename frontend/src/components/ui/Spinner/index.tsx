"use client"

import HourglassIcon from "@mui/icons-material/HourglassFullRounded"

import styles from "./Spinner.module.scss"

interface IProps {
	text?: string
}

export default function Spinner({ text = "Загрузка..." }: IProps) {
	return (
		<div className={styles.container}>
			<HourglassIcon className={styles.spinner} />

			<h5 className={styles.hint}>{text}</h5>
		</div>
	)
}
