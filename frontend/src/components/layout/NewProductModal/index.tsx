"use client"

import CloseIcon from "@mui/icons-material/Close"
import { useAtom } from "jotai"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"

import { newProductModalAtom } from "@/stores/newProductModal.store"
import { UnitsEnum } from "@/types/products.types"

import styles from "./NewProductModal.module.scss"

export default function NewProductModal() {
	const firstInpRef = useRef<HTMLInputElement>(null)

	const [modalState, setModalState] = useAtom(newProductModalAtom)

	useEffect(() => {
		if (modalState) {
			document.body.style.overflowY = "hidden"

			firstInpRef.current?.focus()
		} else document.body.style.overflowY = "scroll"
	}, [modalState])

	return (
		<AnimatePresence mode="wait">
			{modalState && (
				<motion.div
					key="modal-overlay"
					onClick={() => setModalState(false)}
					className={styles.overlay}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.35 }}
				>
					<motion.section
						key="modal-content"
						className={styles["new_product-modal"]}
						onClick={e => e.stopPropagation()}
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{
							duration: 0.15,
							type: "spring",
							damping: 25,
							stiffness: 300
						}}
					>
						<button
							className={styles["close-btn"]}
							onClick={() => setModalState(false)}
						>
							<CloseIcon />
						</button>

						<h3 className={styles.heading}>Создание продукта</h3>

						<form className={styles["new-product-form"]}>
							<label htmlFor="title-inp">Название:</label>
							<input ref={firstInpRef} type="text" id="title-inp" />

							<label htmlFor="units-inp">Единицы измерения:</label>
							<select id="units-inp">
								<option value={UnitsEnum.KILOGRAMS}>В килограммах</option>
								<option value={UnitsEnum.PIECES}>В штуках</option>
							</select>

							<button className={styles["save-btn"]} type="submit">
								Сохранить
							</button>
						</form>
					</motion.section>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
