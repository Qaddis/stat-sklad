import type { UnitsEnum } from "./products.types"

export interface IActionItem {
	product_id: string
	name: string
	units: keyof typeof UnitsEnum
	quantity: number
}

export interface IAction {
	id: string
	type: keyof typeof ActionTypeEnum
	products: IActionItem[]
	created_at: string
}

export const enum ActionTypeEnum {
	SUPPLY = "SUPPLY",
	WRITE_OFF = "WRITE_OFF",
	TAKEN = "TAKEN"
}
