"use client"

import { DarkMode, LightMode } from "@mui/icons-material"
import { useAtom } from "jotai"

import { themeAtom } from "@/stores/theme.store"
import { changeTheme } from "@/utils/theme.utils"

import styles from "./ThemeSwitch.module.scss"

export default function ThemeSwitchButton() {
	const [isDarkMode, setIsDarkMode] = useAtom(themeAtom)

	const handleClick = (): void => {
		setIsDarkMode(prev => !prev)

		changeTheme(document, !isDarkMode)
	}

	return (
		<button
			onClick={handleClick}
			className={styles["theme-switch"]}
			title={"Сменить тему на " + (isDarkMode ? "светлую" : "тёмную")}
		>
			{isDarkMode ? <DarkMode /> : <LightMode />}
		</button>
	)
}
