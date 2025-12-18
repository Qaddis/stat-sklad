import * as yup from "yup"

export const userSchema = yup.object().shape({
	first_name: yup
		.string()
		.trim()
		.required("Это поле является обязательным")
		.min(2, "Поле должно содержать не менее 2 символов")
		.max(16, "Поле должно содержать не более 16 символов"),
	second_name: yup
		.string()
		.trim()
		.required("Это поле является обязательным")
		.min(2, "Поле должно содержать не менее 2 символов")
		.max(16, "Поле должно содержать не более 16 символов"),
	password: yup.string().trim().required("Это поле является обязательным")
})
