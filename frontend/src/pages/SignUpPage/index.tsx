"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import NextLink from "next/link"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import PageHeading from "@/components/ui/PageHeading"
import PasswordInput from "@/components/ui/inputs/PasswordInput"
import TextInput from "@/components/ui/inputs/TextInput"

import authService from "@/api/services/auth.service"
import { NavigationEnum } from "@/constants/navigation.constants"
import { signUpSchema } from "@/schemas/sign-up.schema"
import type { ISignUpFormData } from "@/types/auth.types"

import styles from "./SignUpPage.module.scss"

export default function SignUpPage() {
	const [formError, setFormError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ISignUpFormData>({
		resolver: yupResolver(signUpSchema)
	})

	const submitHandler: SubmitHandler<ISignUpFormData> = async data => {
		setFormError(null)

		const res = await authService.signUp(data)

		if (res.status === 200) location.reload()
		else setFormError(res.error!)

		reset()
	}

	return (
		<div className={styles.page}>
			<PageHeading>Регистрация</PageHeading>

			<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
				<label htmlFor="first_name-inp">Имя:</label>
				<TextInput
					{...register("first_name")}
					id="first_name-inp"
					autoComplete="given-name"
				/>
				{errors.first_name && (
					<span className={styles["form_field-error"]}>
						{errors.first_name.message}
					</span>
				)}

				<label htmlFor="second_name-inp">Фамилия:</label>
				<TextInput
					{...register("second_name")}
					id="second_name-inp"
					autoComplete="family-name"
				/>
				{errors.second_name && (
					<span className={styles["form_field-error"]}>
						{errors.second_name.message}
					</span>
				)}

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
					autoComplete="new-password"
				/>
				{errors.password && (
					<span className={styles["form_field-error"]}>
						{errors.password.message}
					</span>
				)}

				<button className={styles["save-btn"]} type="submit">
					Зарегестрироваться
				</button>

				{formError && <span className={styles["form-error"]}>{formError}</span>}
			</form>

			<p className={styles["another-login-option"]}>
				Уже есть аккаунт?{" "}
				<NextLink href={NavigationEnum.LOGIN.SIGN_IN}>Вход</NextLink>
			</p>
		</div>
	)
}
