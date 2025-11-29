import type { Metadata } from "next"

import ActionsPage from "@/pages/ActionsPage"

export const metadata: Metadata = {
	title: "Действия"
}

export default function Actions() {
	return <ActionsPage />
}
