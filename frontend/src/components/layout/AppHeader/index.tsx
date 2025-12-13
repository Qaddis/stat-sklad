"use client"

import { motion, useMotionValueEvent, useScroll } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import Logo from "@/assets/Logo.png"
import {
	authorizedLinks,
	NavigationEnum,
	unauthorizedLinks
} from "@/constants/navigation.constants"
import ThemeSwitchButton from "../../features/ThemeSwitch"
import NavLink from "../../ui/NavLink"

import styles from "./AppHeader.module.scss"

interface IProps {
	isAuthorized: boolean
}

export default function AppHeader({ isAuthorized }: IProps) {
	const [isHidden, setIsHidden] = useState<boolean>(false)

	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, "change", latest => {
		const previously = scrollY.getPrevious()

		if (previously) {
			if (latest > 100 && latest > previously) {
				if (latest - previously > 5) setIsHidden(true)
			} else {
				if (previously - latest > 5) setIsHidden(false)
			}
		}
	})

	return (
		<motion.header
			className={styles.header}
			animate={isHidden ? "hide" : "show"}
			variants={{ show: { y: 0 }, hide: { y: "-100%" } }}
			transition={{ y: { duration: 0.25, ease: "easeOut" } }}
		>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>
					<Link href={NavigationEnum.HOME}>
						<Image src={Logo} alt="Логотип" />

						<span>СтатСклад</span>
					</Link>
				</h1>

				<div className={styles.buttons}>
					<nav className={styles.nav}>
						{(isAuthorized ? authorizedLinks : unauthorizedLinks).map(
							(item, idx) => (
								<NavLink key={`header-link-${idx}`} to={item.link}>
									{item.title}
								</NavLink>
							)
						)}
					</nav>

					<ThemeSwitchButton />
				</div>
			</div>
		</motion.header>
	)
}
