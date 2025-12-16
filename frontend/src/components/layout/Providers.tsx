"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import NewProductModal from "./NewProductModal"

interface IProps extends PropsWithChildren {
	isAuthorized: boolean
}

const queryClient = new QueryClient()

export default function Providers({ isAuthorized, children }: IProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AppHeader isAuthorized={isAuthorized} />

			<main className="main">
				<div className="wrapper">{children}</div>
			</main>

			<NewProductModal />

			<AppFooter />
		</QueryClientProvider>
	)
}
