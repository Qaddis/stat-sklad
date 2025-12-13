import type { NavigationRoutesType } from "@/types/navigation.types"

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
