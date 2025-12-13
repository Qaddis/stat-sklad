export interface IResponseResult<T> {
	status: number
	data?: T
	error?: string
}
