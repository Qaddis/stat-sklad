"use client"

import Image from "next/image"
import Link from "next/link"

import Logo from "@/assets/Logo.png"
import { NavigationEnum } from "@/constants/navigation.constants"
import ThemeSwitchButton from "../features/ThemeSwitch"
import NavLink from "../ui/NavLink"

import styles from "./AppHeader.module.scss"

export default function AppHeader() {
	return (
		<header className={styles.header}>
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
		</header>
	)
}
