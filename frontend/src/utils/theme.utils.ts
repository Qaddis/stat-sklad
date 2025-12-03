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

	root.style.setProperty(
		"--icon-calendar",
		isDarkMode ? "var(--icon-calendar-light)" : "var(--icon-calendar-dark)"
	)
}

export const plotsColors = [
	"#44a1ad",
	"#3fcca2",
	"#13ba88",
	"#13a7ba",
	"#4b55ec",
	"#06d667",
	"#1f77b4",
	"#45d37b",
	"#a8d68b",
	"#00c489"
]
