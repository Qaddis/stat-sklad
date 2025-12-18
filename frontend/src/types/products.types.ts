import type { UnitsEnum } from "./ingredients.types"

export interface IProduct {
	id: string
	name: string
	quantity: number
	units: UnitsEnum
	last_supply: string
}

export interface IPaginateProducts {
	items: IProduct[]
	total: number
	page: number
	size: number
}
