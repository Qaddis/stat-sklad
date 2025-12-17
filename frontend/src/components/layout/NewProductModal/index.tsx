"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import CloseIcon from "@mui/icons-material/Close"
import { useAtom } from "jotai"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import TextInput from "@/components/ui/inputs/TextInput"
import { ingredientsSchema } from "@/schemas/ingredient.schema"
import { newProductModalAtom } from "@/stores/newProductModal.store"
import { type IIngredientFormData, UnitsEnum } from "@/types/ingredients.types"

import ingredientsService from "@/api/services/ingredients.service"
import styles from "./NewProductModal.module.scss"

export default function NewProductModal() {
	const firstLabelElem = useRef<HTMLLabelElement>(null)

	const [modalState, setModalState] = useAtom(newProductModalAtom)

	useEffect(() => {
		if (modalState) {
			document.body.style.overflowY = "hidden"

			firstLabelElem.current?.focus()
		} else document.body.style.overflowY = "scroll"
	}, [modalState])

	const [formError, setFormError] = useState<string | null>(null)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<IIngredientFormData>({
		resolver: yupResolver(ingredientsSchema),
		defaultValues: {
			units: UnitsEnum.KILOGRAMS
		}
	})

	const submitHandler: SubmitHandler<IIngredientFormData> = async data => {
		setFormError(null)

		const response = await ingredientsService.new(data)

		if (response.status === 200) setModalState(false)
		else setFormError(response.error!)

		reset()
	}

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

						<form
							onSubmit={handleSubmit(submitHandler)}
							className={styles["new-product-form"]}
						>
							<label ref={firstLabelElem} htmlFor="title-inp">
								Название:
							</label>
							<TextInput {...register("name")} type="text" id="title-inp" />
							{errors.name && (
								<span className={styles["form_field-error"]}>
									{errors.name.message}
								</span>
							)}

							<label htmlFor="units-inp">Единицы измерения:</label>
							<select {...register("units")} id="units-inp">
								<option value={UnitsEnum.KILOGRAMS}>В килограммах</option>
								<option value={UnitsEnum.PIECES}>В штуках</option>
							</select>
							{errors.units && (
								<span className={styles["form_field-error"]}>
									{errors.units.message}
								</span>
							)}

							<button className={styles["save-btn"]} type="submit">
								Сохранить
							</button>
							{formError && (
								<span className={styles["form-error"]}>{formError}</span>
							)}
						</form>
					</motion.section>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
