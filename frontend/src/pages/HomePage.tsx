"use client"

import ProductsQuantityPlot from "@/components/features/plots/ProductsQuantityPlot"
import SuppliesCountPlot from "@/components/features/plots/SuppliesCountPlot"
import PageHeading from "@/components/ui/PageHeading"
import { UnitsEnum } from "@/types/products.types"

import styles from "./HomePage.module.scss"

// FIXME:
import { products, suppliesCount } from "@/data"

export default function HomePage() {
	const productsInKgs = products.filter(p => p.units === UnitsEnum.KILOGRAMS)
	const productsInPieces = products.filter(p => p.units === UnitsEnum.PIECES)

	return (
		<div className={styles.page}>
			<PageHeading>Главная</PageHeading>

			<div className={styles.content}>
				<h3 className={styles["sect-heading"]}>Статистика</h3>

				<ProductsQuantityPlot
					dataInKgs={productsInKgs.map(p => p.quantity)}
					labelsInKgs={productsInKgs.map(p => p.name)}
					dataInPieces={productsInPieces.map(p => p.quantity)}
					labelsInPieces={productsInPieces.map(p => p.name)}
				/>

				<SuppliesCountPlot data={suppliesCount} />
			</div>
		</div>
	)
}
