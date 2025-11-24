import type { IProduct } from "@/types/products.types"

import { UnitsEnum } from "@/types/products.types"

export const products: IProduct[] = [
	{
		id: "uid-p-1",
		name: 'Яблоки "Гренни Смит"',
		quantity: 20,
		units: UnitsEnum.KILOGRAMS,
		lastSupply: "2025-11-24T12:30:00Z"
	},
	{
		id: "uid-p-2",
		name: 'Помидоры "Черри"',
		quantity: 5,
		units: UnitsEnum.KILOGRAMS,
		lastSupply: "2025-11-22T10:00:00Z"
	},
	{
		id: "uid-p-3",
		name: "Бананы",
		quantity: 12,
		units: UnitsEnum.KILOGRAMS,
		lastSupply: "2025-11-24T12:30:00Z"
	}
]
