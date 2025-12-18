import styles from "./Error.module.scss"

interface IProps {
	message: string
}

export default function Error({ message }: IProps) {
	return (
		<div className={styles.error}>
			<h3 className={styles.title}>Ошибка!</h3>

			<p className={styles.message}>{message}</p>
		</div>
	)
}
