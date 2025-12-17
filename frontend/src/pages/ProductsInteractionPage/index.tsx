"use client"

import { Add, Remove } from "@mui/icons-material"
import { useState } from "react"
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import ProductInput from "@/components/features/ProductInput"
import PageHeading from "@/components/ui/PageHeading"
import { ActionTypeEnum, type IActionFormData } from "@/types/actions.types"
import { getActionTypeLabel } from "@/utils/labels.utils"

import productsService from "@/api/services/products.service"
import styles from "./ProductsInteractionPage.module.scss"

interface IProps {
	actionType: keyof typeof ActionTypeEnum
}

export default function ProductsInteractionPage({ actionType }: IProps) {
	const [formError, setFormError] = useState<string | null>(null)

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IActionFormData>({
		defaultValues: {
			suply_content: [{ ingredient_id: "", quantity: 0 }]
		}
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: "suply_content"
	})

	const submitHandler: SubmitHandler<IActionFormData> = async data => {
		setFormError(null)

		const response = await productsService.action(actionType, data)

		if (response.status !== 200) setFormError(response.error!)

		reset()
	}

	return (
		<div className={styles.page}>
			<PageHeading>{getActionTypeLabel(actionType)}</PageHeading>

			<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
				{fields.map((field, idx) => (
					<article key={field.id} className={styles.product}>
						<div className={styles["inp-with-label"]}>
							<label
								className={styles["ing_id-inp-label"]}
								htmlFor={`ing_id-inp-${field.id}`}
							>
								Продукт:
							</label>

							<ProductInput
								control={control}
								name={`suply_content.${idx}.ingredient_id`}
								rules={{
									required: {
										value: true,
										message: "Это поле является обязательным"
									}
								}}
								className={styles["ing_id-inp-field"]}
								id={`ing_id-inp-${field.id}`}
								type="text"
							/>

							{errors.suply_content &&
								errors.suply_content[idx] &&
								errors.suply_content[idx].ingredient_id && (
									<span className={styles["form_field-error"]}>
										{errors.suply_content[idx].ingredient_id.message}
									</span>
								)}
						</div>

						<div className={styles["inp-with-label"]}>
							<label
								className={styles["quantity-inp-label"]}
								htmlFor={`quantity-inp-${field.id}`}
							>
								Кол-во:
							</label>

							<input
								{...register(`suply_content.${idx}.quantity`, {
									valueAsNumber: true,
									required: {
										value: true,
										message: "Данное поле является обязательным"
									},
									validate: value => value > 0 || "Число должно быть больше 0"
								})}
								className={styles["quantity-inp-field"]}
								id={`quantity-inp-${field.id}`}
								type="number"
							/>

							{errors.suply_content &&
								errors.suply_content[idx] &&
								errors.suply_content[idx].quantity && (
									<span className={styles["form_field-error"]}>
										{errors.suply_content[idx].quantity.message}
									</span>
								)}
						</div>

						<button
							onClick={() => fields.length !== 1 && remove(idx)}
							className={styles["remove-btn"]}
							disabled={fields.length === 1}
							title={
								fields.length === 1
									? "Недоступно. В списке должен быть хотя бы 1 продукт"
									: "Удалить продукт из списка"
							}
							type="button"
						>
							<Remove />
						</button>
					</article>
				))}

				<button
					onClick={() => append({ ingredient_id: "", quantity: 0 })}
					className={styles["add_product-btn"]}
					title="Добавить продукт в список"
					type="button"
				>
					<Add />
				</button>

				<button className={styles["submit-btn"]} type="submit">
					Сохранить
				</button>

				{formError && <span className={styles["form-error"]}>{formError}</span>}
			</form>
		</div>
	)
}
