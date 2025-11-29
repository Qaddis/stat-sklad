import type { Metadata } from "next"

import HomePage from "@/pages/HomePage"

export const metadata: Metadata = {
	title: "Главная | СтатСклад"
}

export default function Home() {
	return <HomePage />
}
