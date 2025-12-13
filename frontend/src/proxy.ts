/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	NextResponse,
	type MiddlewareConfig,
	type NextRequest
} from "next/server"

import { STORAGE_KEYS } from "./constants/api.constants"
import {
	dynamicPaths,
	NavigationEnum,
	protectedPaths,
	publicPaths
} from "./constants/navigation.constants"

export function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value
	const path = request.nextUrl.pathname

	if (
		!accessToken &&
		(protectedPaths.includes(path) ||
			dynamicPaths.some(p => path.startsWith(p)))
	)
		return NextResponse.redirect(
			new URL(NavigationEnum.LOGIN.SIGN_IN, request.url)
		)

	if (accessToken && publicPaths.includes(path as any))
		return NextResponse.redirect(new URL(NavigationEnum.USER, request.url))

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|ico|woff2)$).*)"
	]
}
