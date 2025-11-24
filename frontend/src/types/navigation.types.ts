import type { NavigationEnum } from "@/constants/navigation.constants"

// Хелпер
type NestedPath<T> = T extends string
	? T
	: T extends object
		? { [K in keyof T]: NestedPath<T[K]> }[keyof T]
		: never

export type NavigationRoutesType = NestedPath<typeof NavigationEnum>
