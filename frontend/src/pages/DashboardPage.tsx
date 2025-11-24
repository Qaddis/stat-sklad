"use client"

import { ArrowBackIosNew, ArrowForwardIos, Search } from "@mui/icons-material"

import PageHeader from "@/components/ui/PageHeader"
import { UnitsEnum } from "@/types/products.types"
import { formatDate } from "@/utils/datetime.utils"

import styles from "./DashboardPage.module.scss"

// FIXME:
import { products } from "@/data/products.data"

export default function DashboardPage() {
	return (
		<div className={styles.page}>
			<PageHeader>Дашбоард</PageHeader>

			<aside className={styles["search-block"]}>
				<div className={styles["search-block__search-sect"]}>
					<input
						className={styles["search-block__search-inp"]}
						type="text"
						placeholder="Поиск по названию"
					/>

					<button className={styles["search-block__search-btn"]}>
						<Search />
					</button>
				</div>

				<select
					defaultValue="25"
					className={styles["search-block__pagination-size-select"]}
				>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="75">75</option>
					<option value="100">100</option>
				</select>

				<div className={styles["search-block__pagination-page-num"]}>
					<button className={styles["search-block__page-num-btn"]}>
						<ArrowBackIosNew />
					</button>

					<p className={styles["search-block__page-num"]}>
						1 <span>/</span> 13
					</p>

					<button className={styles["search-block__page-num-btn"]}>
						<ArrowForwardIos />
					</button>
				</div>
			</aside>

			<section className={styles.content}>
				<table className={styles["products-table"]}>
					<thead>
						<tr className={styles["products-table__headings"]}>
							<th className={styles["products-table__heading"]}>
								Название продукта
							</th>
							<th className={styles["products-table__heading"]}>Количество</th>
							<th className={styles["products-table__heading"]}>
								Дата последней поставки
							</th>
						</tr>
					</thead>

					<tbody>
						{products.map(product => (
							<tr
								key={product.id}
								className={styles["products-table__data-row"]}
							>
								<td className={styles["products-table__data-col"]}>
									{product.name}
								</td>
								<td className={styles["products-table__data-col"]}>
									{product.quantity}{" "}
									{product.units === UnitsEnum.KILOGRAMS ? "кг." : "ед."}
								</td>
								<td className={styles["products-table__data-col"]}>
									{formatDate(product.lastSupply)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	)
}
