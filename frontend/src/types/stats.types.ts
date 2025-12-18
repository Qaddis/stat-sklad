export interface IProductsStatsData {
	in_kilograms: IProductsStatsPiece[]
	in_pieces: IProductsStatsPiece[]
}

export interface IProductsStatsPiece {
	name: string
	quantity: number
}
