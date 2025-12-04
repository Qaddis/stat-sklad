"use client"

import PageHeading from "@/components/ui/PageHeading"
import PasswordInput from "@/components/ui/inputs/PasswordInput"
import TextInput from "@/components/ui/inputs/TextInput"

import styles from "./SignInPage.module.scss"

export default function SignInPage() {
	return (
		<div className={styles.page}>
			<PageHeading>Войти в аккаунт</PageHeading>

			<form className={styles.form}>
				<label htmlFor="email-inp">E-mail:</label>
				<TextInput id="email-inp" type="email" />

				<label htmlFor="password-inp">Пароль:</label>
				<PasswordInput id="password-inp" />

				<button className={styles["save-btn"]} type="submit">
					Войти
				</button>
			</form>
		</div>
	)
}
