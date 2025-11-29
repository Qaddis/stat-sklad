"use client"

import Link from "next/link"
import type { ComponentType } from "react"

import type { NavigationRoutesType } from "@/types/navigation.types"

import styles from "./ActionLink.module.scss"

interface IProps {
	to: NavigationRoutesType
	title: string
	icon: ComponentType
}

export default function ActionLink({ to, title, icon: Icon }: IProps) {
	return (
		<Link href={to} className={styles["action-link"]}>
			<h4>{title}</h4>

			<Icon />
		</Link>
	)
}
