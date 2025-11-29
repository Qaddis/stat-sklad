import { ActionTypeEnum, type IAction } from "@/types/actions.types"
import { UnitsEnum } from "@/types/products.types"

export const actions: IAction[] = [
	{
		id: "id-a-1",
		type: ActionTypeEnum.SUPPLY,
		products: [
			{
				product_id: "uid-p-2",
				name: 'Яблоки "Гренни Смит"',
				units: UnitsEnum.KILOGRAMS,
				quantity: 20
			},
			{
				product_id: "uid-p-3",
				name: "Бананы",
				quantity: 20,
				units: UnitsEnum.KILOGRAMS
			}
		],
		created_at: "2025-11-24T12:30:00Z"
	},
	{
		id: "id-a-2",
		type: ActionTypeEnum.SUPPLY,
		products: [
			{
				product_id: "uid-p-4",
				name: "Добрый кола, 1 л.",
				units: UnitsEnum.PIECES,
				quantity: 40
			},
			{
				product_id: "uid-p-5",
				name: 'Сироп "Блю Кирасау", 450 мл.',
				quantity: 10,
				units: UnitsEnum.PIECES
			}
		],
		created_at: "2025-11-25T16:00:00Z"
	},
	{
		id: "id-a-3",
		type: ActionTypeEnum.WRITE_OFF,
		products: [
			{
				product_id: "uid-p-3",
				name: "Бананы",
				quantity: 8,
				units: UnitsEnum.KILOGRAMS
			}
		],
		created_at: "2025-11-28T09:00:00Z"
	},
	{
		id: "id-a-4",
		type: ActionTypeEnum.TAKEN,
		products: [
			{
				product_id: "uid-p-4",
				name: "Добрый кола, 1 л.",
				units: UnitsEnum.PIECES,
				quantity: 8
			},
			{
				product_id: "uid-p-5",
				name: 'Сироп "Блю Кирасау", 450 мл.',
				quantity: 3,
				units: UnitsEnum.PIECES
			}
		],
		created_at: "2025-11-28T16:00:00Z"
	}
]
