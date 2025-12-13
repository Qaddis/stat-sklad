import type { Metadata } from "next"
import { cookies as getCookies } from "next/headers"

import { STORAGE_KEYS } from "@/constants/api.constants"
import HomePage from "@/pages/HomePage"
import LandingPage from "@/pages/LandingPage"

export const metadata: Metadata = {
	title: "Главная | СтатСклад"
}

export default async function Home() {
	const cookies = await getCookies()
	const accessToken = cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value

	return accessToken ? <HomePage /> : <LandingPage />
}
