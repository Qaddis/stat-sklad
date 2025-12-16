"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import NextLink from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import PageHeading from "@/components/ui/PageHeading"
import PasswordInput from "@/components/ui/inputs/PasswordInput"
import TextInput from "@/components/ui/inputs/TextInput"

import authService from "@/api/services/auth.service"
import { NavigationEnum } from "@/constants/navigation.constants"
import { signInSchema } from "@/schemas/sign-in.schema"
import { ISignInFormData } from "@/types/auth.types"

import styles from "./SignInPage.module.scss"

export default function SignInPage() {
	const [formError, setFormError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ISignInFormData>({
		resolver: yupResolver(signInSchema)
	})

	const submitHandler: SubmitHandler<ISignInFormData> = async data => {
		setFormError(null)

		const res = await authService.signIn(data)

		if (res.status === 200) location.reload()
		else setFormError(res.error!)

		reset()
	}

	return (
		<div className={styles.page}>
			<PageHeading>Войти в аккаунт</PageHeading>

			<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
				<label htmlFor="email-inp">E-mail:</label>
				<TextInput
					{...register("email")}
					id="email-inp"
					type="email"
					autoComplete="email"
				/>
				{errors.email && (
					<span className={styles["form_field-error"]}>
						{errors.email.message}
					</span>
				)}

				<label htmlFor="password-inp">Пароль:</label>
				<PasswordInput
					{...register("password")}
					id="password-inp"
					autoComplete="current-password"
				/>
				{errors.password && (
					<span className={styles["form_field-error"]}>
						{errors.password.message}
					</span>
				)}

				<button className={styles["save-btn"]} type="submit">
					Войти
				</button>

				{formError && <span className={styles["form-error"]}>{formError}</span>}
			</form>

			<p className={styles["another-login-option"]}>
				Нет аккаунта?{" "}
				<NextLink href={NavigationEnum.LOGIN.SIGN_UP}>Создать</NextLink>
			</p>
		</div>
	)
}
