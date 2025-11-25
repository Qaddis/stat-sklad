export const enum RolesEnum {
	ADMIN = "ADMIN",
	COOK = "COOK",
	BOOKER = "BOOKER",
	WAITER = "WAITER"
}

export interface IUser {
	id: string
	first_name: string
	second_name: string
	email: string
	role: keyof typeof RolesEnum
}
