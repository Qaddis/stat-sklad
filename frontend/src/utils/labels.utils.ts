import { ActionTypeEnum } from "@/types/actions.types"
import { UnitsEnum } from "@/types/ingredients.types"

export const getActionTypeLabel = (
	type: keyof typeof ActionTypeEnum
): string =>
	type === ActionTypeEnum.SUPPLY
		? "Поставка"
		: type === ActionTypeEnum.WRITE_OFF
			? "Списание"
			: type === ActionTypeEnum.TAKEN
				? "Использование"
				: "ОШИБКА"

export const getProductUnitsLabel = (units: keyof typeof UnitsEnum): string =>
	units === UnitsEnum.KILOGRAMS ? "кг." : "шт."
