"use client"

import HelpIcon from "@mui/icons-material/HelpOutline"

import PageHeader from "@/components/ui/PageHeader"
import { user } from "@/data/user.data"

import styles from "./UserPage.module.scss"

export default function UserPage() {
	return (
		<div className={styles.page}>
			<PageHeader>Профиль</PageHeader>

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
							defaultValue={user.first_name}
							className={styles["user-info__field"]}
							type="text"
							id="first-name-field"
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
							defaultValue={user.second_name}
							className={styles["user-info__field"]}
							type="text"
							id="second-name-field"
						/>
					</div>

					<div className={styles["inp-with-label"]}>
						<label className={styles["user-info__label"]} htmlFor="email-field">
							E-mail:
						</label>

						<input
							defaultValue={user.email}
							className={styles["user-info__field"]}
							type="text"
							id="email-field"
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
						/>
					</div>

					<button className={styles["save_profile-btn"]}>
						Сохранить изменения
					</button>
				</form>

				<button className={styles["logout-btn"]}>Выйти из аккаунта</button>
			</section>
		</div>
	)
}
