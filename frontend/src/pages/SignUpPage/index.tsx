"use client"

import PageHeading from "@/components/ui/PageHeading"
import PasswordInput from "@/components/ui/inputs/PasswordInput"
import TextInput from "@/components/ui/inputs/TextInput"

import styles from "./SignUpPage.module.scss"

export default function SignUpPage() {
	return (
		<div className={styles.page}>
			<PageHeading>Регистрация</PageHeading>

			<form className={styles.form}>
				<label htmlFor="first_name-inp">Имя:</label>
				<TextInput id="first_name-inp" />

				<label htmlFor="second_name-inp">Фамилия:</label>
				<TextInput id="second_name-inp" />

				<label htmlFor="email-inp">E-mail:</label>
				<TextInput id="email-inp" type="email" />

				<label htmlFor="password-inp">Пароль:</label>
				<PasswordInput id="password-inp" />

				<button className={styles["save-btn"]} type="submit">
					Зарегестрироваться
				</button>
			</form>
		</div>
	)
}
