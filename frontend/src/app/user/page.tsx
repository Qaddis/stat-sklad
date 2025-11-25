import type { Metadata } from "next"

import UserPage from "@/pages/UserPage"

export const metadata: Metadata = {
	title: "Профиль"
}

export default function User() {
	return <UserPage />
}
