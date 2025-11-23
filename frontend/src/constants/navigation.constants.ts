export const NavigationEnum = {
	HOME: "/",
	DASHBOARD: "/dashboard",
	ACTIONS: {
		ALL: "/actions",
		WRITE_OFF: "/actions/write-off",
		NEW_SUPPLY: "/actions/new-supply",
		HISTORY: "/actions/history"
	},
	USER: "/user",
	LOGIN: {
		SIGN_IN: "/login/sign-in",
		SIGN_UP: "/login/sign-up"
	}
} as const
