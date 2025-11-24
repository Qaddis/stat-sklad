import type { Metadata } from "next"
import { Martian_Mono, Roboto } from "next/font/google"

import AppFooter from "@/components/layout/AppFooter"
import AppHeader from "@/components/layout/AppHeader"

import "@/assets/styles/globals.scss"

const martianMono = Martian_Mono({
	variable: "--martian-font",
	subsets: ["cyrillic", "latin"],
	weight: ["600", "800"],
	style: ["normal"]
})

const roboto = Roboto({
	variable: "--roboto-font",
	subsets: ["cyrillic-ext", "latin-ext"],
	weight: ["400", "600"],
	style: ["normal", "italic"]
})

export const metadata: Metadata = {
	title: {
		template: "%s | СтатСклад",
		default: "СтатСклад"
	},
	description: "СтатСклад - система учёта продуктов на складе",
	authors: [
		{ name: "Святослав Барсуков", url: "https://github.com/Qaddis" },
		{ name: "Роман Баранов", url: "https://github.com/bebdeb" },
		{ name: "Кирилл Биловусяк", url: "https://github.com/19Akvarelka91" }
	]
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ru">
			<body className={`${martianMono.variable} ${roboto.variable}`}>
				<AppHeader />

				<main className="main">
					<div className="wrapper">{children}</div>
				</main>

				<AppFooter />
			</body>
		</html>
	)
}
