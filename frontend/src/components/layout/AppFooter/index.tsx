"use client"

import styles from "./AppFooter.module.scss"

export default function AppFooter() {
	const goUp = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
		evt.preventDefault()

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		})
	}

	return (
		<footer className={styles.footer}>
			<div className={styles.wrapper}>
				<p className={styles.copyright}>
					Святослав &ldquo;Qaddis&rdquo; Барсуков &copy; 2025
				</p>

				<a className={styles["go_up-btn"]} href="#" onClick={goUp}>
					Наверх
				</a>
			</div>
		</footer>
	)
}
