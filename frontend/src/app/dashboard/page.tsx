import type { Metadata } from "next"

import DashboardPage from "@/pages/DashboardPage"

export const metadata: Metadata = {
	title: "Дашборд"
}

export default function Dashboard() {
	return <DashboardPage />
}
