/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NavigationRoutesType } from "@/types/navigation.types"
import { getStaticPaths } from "@/utils/navigation.utils"

interface NavLinks {
	title: string
	link: NavigationRoutesType
}

export const NavigationEnum = {
	HOME: "/",
	DASHBOARD: "/dashboard",
	ACTIONS: {
		ALL: "/actions",
		WRITE_OFF: "/actions/write-off",
		NEW_SUPPLY: "/actions/new-supply",
		HISTORY: {
			ALL: "/actions/history",
			ACTION: "/actions/history/" // + action_id
		}
	},
	USER: "/user",
	LOGIN: {
		SIGN_IN: "/login/sign-in",
		SIGN_UP: "/login/sign-up"
	}
} as const

const STATIC_PATHS = getStaticPaths(NavigationEnum)

export const publicPaths = [
	NavigationEnum.LOGIN.SIGN_IN,
	NavigationEnum.LOGIN.SIGN_UP,
	NavigationEnum.HOME
] as const

export const protectedPaths = STATIC_PATHS.filter(
	path => !path.endsWith("/") && !publicPaths.includes(path as any)
)

export const dynamicPaths = STATIC_PATHS.filter(
	path => path.endsWith("/") && !publicPaths.some(p => path.startsWith(p))
)

export const authorizedLinks: NavLinks[] = [
	{
		title: "Главная",
		link: NavigationEnum.HOME
	},
	{
		title: "Дашборд",
		link: NavigationEnum.DASHBOARD
	},
	{
		title: "Действия",
		link: NavigationEnum.ACTIONS.ALL
	},
	{
		title: "Профиль",
		link: NavigationEnum.USER
	}
]

export const unauthorizedLinks: NavLinks[] = [
	{
		title: "Главная",
		link: NavigationEnum.HOME
	},
	{
		title: "Вход",
		link: NavigationEnum.LOGIN.SIGN_IN
	}
]
