"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import HelpIcon from "@mui/icons-material/HelpOutline"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import Error from "@/components/ui/Error"
import PageHeading from "@/components/ui/PageHeading"
import Spinner from "@/components/ui/Spinner"

import { removeTokens } from "@/api/auth.helper"
import userService from "@/api/services/user.service"
import { userSchema } from "@/schemas/user.schema"
import type { IUserFormData } from "@/types/user.types"

import PasswordInput from "@/components/ui/inputs/PasswordInput"
import styles from "./UserPage.module.scss"

export default function UserPage() {
	const [formError, setFormError] = useState<string | null>(null)

	const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ["user"],
		queryFn: () => userService.get()
	})

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<IUserFormData>({
		mode: "onChange",
		resolver: yupResolver(userSchema)
	})

	const submitHandler: SubmitHandler<IUserFormData> = async data => {
		setFormError(null)

		const response = await userService.changeUserData(data)

		if (response.status === 200) refetch()
		else setFormError(response.error!)

		reset()
	}

	const logout = (): void => {
		removeTokens()

		location.reload()
	}

	if (isLoading) return <Spinner />

	if (isError) return <Error message={error.message} />

	if (isSuccess)
		return (
			<div className={styles.page}>
				<PageHeading>Профиль</PageHeading>

				<section className={styles.content}>
					<form
						onSubmit={handleSubmit(submitHandler)}
						className={styles["user-info"]}
					>
						<div className={styles["inp-with-label"]}>
							<label
								className={styles["user-info__label"]}
								htmlFor="first-name-field"
							>
								Имя:
							</label>

							<input
								{...register("first_name")}
								defaultValue={data.first_name}
								className={styles["user-info__field"]}
								type="text"
								id="first-name-field"
								autoComplete="off"
							/>
						</div>
						{errors.first_name && (
							<span className={styles["form_field-error"]}>
								{errors.first_name.message}
							</span>
						)}

						<div className={styles["inp-with-label"]}>
							<label
								className={styles["user-info__label"]}
								htmlFor="second-name-field"
							>
								Фамилия:
							</label>

							<input
								{...register("second_name")}
								defaultValue={data.second_name}
								className={styles["user-info__field"]}
								type="text"
								id="second-name-field"
								autoComplete="off"
							/>
						</div>
						{errors.second_name && (
							<span className={styles["form_field-error"]}>
								{errors.second_name.message}
							</span>
						)}

						<div className={styles["inp-with-label"]}>
							<label
								className={styles["user-info__label"]}
								htmlFor="email-field"
							>
								E-mail:
							</label>

							<input
								defaultValue={data.email}
								className={styles["user-info__field"]}
								type="text"
								id="email-field"
								autoComplete="off"
								disabled
							/>
						</div>

						<div className={styles["inp-with-label"]}>
							<label
								className={styles["user-info__label"]}
								htmlFor="password-field"
							>
								Пароль:{" "}
								<span
									className={styles.help}
									title="Введите актуальный пароль от учётной записи, чтобы поменять информацию профиля"
								>
									<HelpIcon />
								</span>
							</label>

							<PasswordInput
								{...register("password")}
								id="password-field"
								autoComplete="off"
							/>
						</div>
						{errors.password && (
							<span className={styles["form_field-error"]}>
								{errors.password.message}
							</span>
						)}

						<button className={styles["save_profile-btn"]} type="submit">
							Сохранить изменения
						</button>

						{formError && (
							<span className={styles["form-error"]}>{formError}</span>
						)}
					</form>

					<button onClick={logout} className={styles["logout-btn"]}>
						Выйти из аккаунта
					</button>
				</section>
			</div>
		)
}
