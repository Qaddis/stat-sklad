import * as yup from "yup"

export const signInSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.required("Это поле является обязательным")
		.email("Введённое значение должно быть формата email"),
	password: yup.string().trim().required("Это поле является обязательным")
})
