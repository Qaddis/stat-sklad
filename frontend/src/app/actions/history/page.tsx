import type { Metadata } from "next"

import ActionsHistoryPage from "@/pages/ActionsHistoryPage"

export const metadata: Metadata = {
	title: "История операций"
}

export default function ActionsHistory() {
	return <ActionsHistoryPage />
}
