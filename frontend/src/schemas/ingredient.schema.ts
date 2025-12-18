import * as yup from "yup"

import { UnitsEnum } from "@/types/ingredients.types"

export const ingredientsSchema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.required("Это поле является обязательным")
		.min(2, "Длина должна быть не менее 2 символов")
		.max(32, "Длина должна быть не более 32 символов"),
	units: yup
		.string()
		.trim()
		.required("Это поле является обязательным")
		.oneOf(
			[UnitsEnum.KILOGRAMS, UnitsEnum.PIECES],
			"Недопустимая единица измерения"
		)
})
