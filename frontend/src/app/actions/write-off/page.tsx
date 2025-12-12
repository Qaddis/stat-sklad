import type { Metadata } from "next"

import ProductsInteractionPage from "@/pages/ProductsInteractionPage"
import { ActionTypeEnum } from "@/types/actions.types"

export const metadata: Metadata = {
	title: "Списание продуктов"
}

export default function WriteOff() {
	return <ProductsInteractionPage actionType={ActionTypeEnum.WRITE_OFF} />
}
