export interface IProduct {
	id: string
	name: string
	quantity: number
	units: keyof typeof UnitsEnum
	lastSupply: string
}

export const enum UnitsEnum {
	PIECES = "PIECES",
	KILOGRAMS = "KILOGRAMS"
}
