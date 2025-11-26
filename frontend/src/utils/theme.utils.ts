export const changeTheme = (doc: Document, isDarkMode: boolean): void => {
	const root = doc.documentElement

	root.style.setProperty(
		"--main-color",
		isDarkMode ? "var(--main-dark-color)" : "var(--main-light-color)"
	)

	root.style.setProperty(
		"--add-color",
		isDarkMode ? "var(--add-dark-color)" : "var(--add-light-color)"
	)

	root.style.setProperty(
		"--text-color",
		isDarkMode ? "var(--main-light-color)" : "var(--main-dark-color)"
	)
}
