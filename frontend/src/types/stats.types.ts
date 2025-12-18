export interface IProductsStatsData {
	in_kilograms: IProductsStatsPiece[]
	in_pieces: IProductsStatsPiece[]
}

export interface IProductsStatsPiece {
	name: string
	quantity: number
}

export interface ISuppliesStatsData {
	content: ISuppliesStatsPiece[]
}

export interface ISuppliesStatsPiece {
	month: number
	supplies_count: number
}
