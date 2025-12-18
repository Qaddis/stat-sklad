import type { UnitsEnum } from "./ingredients.types"

export const enum ActionTypeEnum {
	SUPPLY = "SUPPLY",
	WRITE_OFF = "WRITE_OFF",
	TAKEN = "TAKEN"
}

export interface IAction {
	id: string
	type: keyof typeof ActionTypeEnum
	products: string[]
	created_at: string
}

export interface IActionExt {
	id: string
	type: keyof typeof ActionTypeEnum
	products: IActionItem[]
	created_at: string
}

export interface IActionItem {
	product_id: string
	name: string
	units: keyof typeof UnitsEnum
	quantity: number
}

export interface IPaginatedActions {
	items: IAction[]
	total: number
	page: number
	size: number
}

export interface IActionFormData {
	supply_content: IActionItemFormData[]
}

export interface IActionItemFormData {
	ingredient_id: string
	quantity: number
}
