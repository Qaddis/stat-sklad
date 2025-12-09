import type { Metadata } from "next"

import SignInPage from "@/pages/SignInPage"

export const metadata: Metadata = {
	title: "Вход"
}

export default function SignIn() {
	return <SignInPage />
}
