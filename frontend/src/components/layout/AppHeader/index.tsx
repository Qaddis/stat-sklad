"use client"

import { motion, useMotionValueEvent, useScroll } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import Logo from "@/assets/Logo.png"
import { NavigationEnum } from "@/constants/navigation.constants"
import ThemeSwitchButton from "../../features/ThemeSwitch"
import NavLink from "../../ui/NavLink"

import styles from "./AppHeader.module.scss"

export default function AppHeader() {
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
						<NavLink to={NavigationEnum.HOME}>Главная</NavLink>
						<NavLink to={NavigationEnum.DASHBOARD}>Дашборд</NavLink>
						<NavLink to={NavigationEnum.ACTIONS.ALL}>Действия</NavLink>
						<NavLink to={NavigationEnum.USER}>Профиль</NavLink>
					</nav>

					<ThemeSwitchButton />
				</div>
			</div>
		</motion.header>
	)
}
