import type { IProduct } from "@/types/products.types"
import { UnitsEnum } from "@/types/products.types"

export const products: IProduct[] = [
	{
		id: "uid-p-1",
		name: 'Помидоры "Черри"',
		quantity: 5,
		units: UnitsEnum.KILOGRAMS,
		lastSupply: "2025-11-22T10:00:00Z"
	},
	{
		id: "uid-p-2",
		name: 'Яблоки "Гренни Смит"',
		quantity: 20,
		units: UnitsEnum.KILOGRAMS,
		lastSupply: "2025-11-24T12:30:00Z"
	},
	{
		id: "uid-p-3",
		name: "Бананы",
		quantity: 12,
		units: UnitsEnum.KILOGRAMS,
		lastSupply: "2025-11-24T12:30:00Z"
	},
	{
		id: "uid-p-4",
		name: "Добрый кола, 1 л.",
		quantity: 32,
		units: UnitsEnum.PIECES,
		lastSupply: "2025-11-25T16:00:00Z"
	},
	{
		id: "uid-p-5",
		name: 'Сироп "Блю Кирасау", 450 мл.',
		quantity: 7,
		units: UnitsEnum.PIECES,
		lastSupply: "2025-11-25T16:00:00Z"
	},
	{
		id: "uid-p-6",
		name: 'Оливковое масло "Маэстро", 450 мл.',
		quantity: 4,
		units: UnitsEnum.PIECES,
		lastSupply: "2025-11-27T14:15:00Z"
	}
]
