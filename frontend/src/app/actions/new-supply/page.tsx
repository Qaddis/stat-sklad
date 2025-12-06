import type { Metadata } from "next"

import ProductsInteractionPage from "@/pages/ProductsInteractionPage"
import { ActionTypeEnum } from "@/types/actions.types"

export const metadata: Metadata = {
	title: "Новая поставка"
}

export default function NewSupply() {
	return <ProductsInteractionPage actionType={ActionTypeEnum.SUPPLY} />
}
