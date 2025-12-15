"use client"

import HelpIcon from "@mui/icons-material/HelpOutline"
import { useQuery } from "@tanstack/react-query"

import Error from "@/components/ui/Error"
import PageHeading from "@/components/ui/PageHeading"
import Spinner from "@/components/ui/Spinner"

import { removeTokens } from "@/api/auth.helper"
import userService from "@/api/services/user.service"

import styles from "./UserPage.module.scss"

export default function UserPage() {
	const { data, error, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["user"],
		queryFn: () => userService.get()
	})

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
					<form className={styles["user-info"]}>
						<div className={styles["inp-with-label"]}>
							<label
								className={styles["user-info__label"]}
								htmlFor="first-name-field"
							>
								Имя:
							</label>

							<input
								defaultValue={data.first_name}
								className={styles["user-info__field"]}
								type="text"
								id="first-name-field"
								autoComplete="off"
							/>
						</div>

						<div className={styles["inp-with-label"]}>
							<label
								className={styles["user-info__label"]}
								htmlFor="second-name-field"
							>
								Фамилия:
							</label>

							<input
								defaultValue={data.second_name}
								className={styles["user-info__field"]}
								type="text"
								id="second-name-field"
								autoComplete="off"
							/>
						</div>

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
								Новый пароль:{" "}
								<span
									className={styles.help}
									title='Введите новый пароль и нажмите "Сохранить изменения", чтобы изменить пароль'
								>
									<HelpIcon />
								</span>
							</label>

							<input
								className={styles["user-info__field"]}
								type="password"
								id="password-field"
								autoComplete="off"
							/>
						</div>

						<button className={styles["save_profile-btn"]} type="submit">
							Сохранить изменения
						</button>
					</form>

					<button onClick={logout} className={styles["logout-btn"]}>
						Выйти из аккаунта
					</button>
				</section>
			</div>
		)
}
