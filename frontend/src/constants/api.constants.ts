export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const enum STORAGE_KEYS {
	ACCESS_TOKEN = "access_token",
	REFRESH_TOKEN = "refresh_token"
}

export const EndpointsEnum = {
	AUTH: {
		SIGN_UP: "/auth/sign_up",
		SIGN_IN: "/auth/sign_in",
		REFRESH: "/auth/refresh"
	},
	USER: "/user",
	PRODUCTS: "/products",
	ACTIONS: {
		SUPPLY: "/actions/supply",
		WRITE_OFF: "/actions/write-off",
		TAKEN: "/actions/taken"
	},
	HISTORY: {
		ALL: "/actions/history",
		ACTION: "/actions/history/", // + action_id
		LAST: "/actions/history/last"
	},
	INGREDIENTS: {
		NEW: "/ingredients",
		HINTS: "/ingredients/hints"
	},
	NOTIFICATIONS: {
		GET: "/notifications",
		DELETE: "/notifications/" // + notification_id
	}
} as const
