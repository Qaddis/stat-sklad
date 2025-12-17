import type { UnitsEnum } from "./ingredients.types"

export interface IProduct {
	id: string
	name: string
	quantity: number
	units: UnitsEnum
	lastSupply: string
}
