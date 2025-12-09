"use client"

import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

import styles from "./Inputs.module.scss"

interface IProps
	extends Omit<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"type"
	> {
	type?: "text" | "email"
}

export default function TextInput({
	className,
	type = "text",
	...props
}: IProps) {
	const getClassName = (): string =>
		className ? `${styles["text-input"]} ${className}` : styles["text-input"]

	return <input className={getClassName()} type={type} {...props} />
}
