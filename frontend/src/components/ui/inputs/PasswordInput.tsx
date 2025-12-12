"use client"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	useState
} from "react"

import styles from "./Inputs.module.scss"

type PropsType = Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	"type"
>

export default function PasswordInput({ className, ...props }: PropsType) {
	const [isPwHidden, setIsPwHidden] = useState(true)

	const getClassName = (): string =>
		className
			? `${styles["password-input"]} ${className}`
			: styles["password-input"]

	return (
		<div className={styles["password-input-container"]}>
			<input
				className={getClassName()}
				type={isPwHidden ? "password" : "text"}
				{...props}
			/>

			<button
				onClick={() => setIsPwHidden(prev => !prev)}
				className={styles["password-input-btn"]}
				type="button"
				title={isPwHidden ? "Показать пароль" : "Скрыть пароль"}
			>
				{isPwHidden ? <Visibility /> : <VisibilityOff />}
			</button>
		</div>
	)
}
