export interface ITokens {
	access_token: string
	refresh_token: string
}

export interface IAuthResponse extends ITokens {
	user_id: string
}
