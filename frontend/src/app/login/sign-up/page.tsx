import type { Metadata } from "next"

import SignUpPage from "@/pages/SignUpPage"

export const metadata: Metadata = {
	title: "Регистрация"
}

export default function SignUp() {
	return <SignUpPage />
}
