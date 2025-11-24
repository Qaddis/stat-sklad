"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { AnchorHTMLAttributes, PropsWithChildren } from "react"

import type { NavigationRoutesType } from "@/types/navigation.types"

import styles from "./NavLink.module.scss"

interface IProps
	extends PropsWithChildren,
		Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	to: NavigationRoutesType
}

export default function NavLink({ children, to, className, ...props }: IProps) {
	const path = usePathname()

	const getClassName = (): string => {
		let totalClassName = styles.link

		if (className) totalClassName += " " + className
		if (path === to) totalClassName += " " + styles["--active"]

		return totalClassName
	}

	return (
		<Link href={to} className={getClassName()} {...props}>
			{children}
		</Link>
	)
}
