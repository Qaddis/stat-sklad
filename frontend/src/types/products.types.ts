export interface IProduct {
	id: string
	name: string
	quantity: number
	units: UnitsEnum
	lastSupply: string
}

export const enum UnitsEnum {
	PIECES = "PIECES",
	KILOGRAMS = "KILOGRAMS"
}
