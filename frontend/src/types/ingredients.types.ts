export const enum UnitsEnum {
	PIECES = "PIECES",
	KILOGRAMS = "KILOGRAMS"
}

export interface IIngredient {
	id: string
	name: string
}

export interface IIngredientFormData {
	name: string
	units: UnitsEnum
}
