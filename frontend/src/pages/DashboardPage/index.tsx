"use client"

import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import Error from "@/components/ui/Error"
import PageHeading from "@/components/ui/PageHeading"
import Spinner from "@/components/ui/Spinner"

import productsService from "@/api/services/products.service"
import { formatDate } from "@/utils/datetime.utils"
import { getProductUnitsLabel } from "@/utils/labels.utils"

import styles from "./DashboardPage.module.scss"

export default function DashboardPage() {
	const [pageSize, setPageSize] = useState(25)
	const [pageNum, setPageNum] = useState(1)
	const [query, setQuery] = useState("")

	const { data, error, isLoading, isError, isSuccess } = useQuery({
		queryKey: ["products", pageNum, pageSize, query],
		queryFn: () => productsService.get(pageSize, pageNum - 1, query)
	})

	return (
		<div className={styles.page}>
			<PageHeading>Дашборд</PageHeading>

			<aside className={styles["search-block"]}>
				<div className={styles["search-block__search-sect"]}>
					<input
						className={styles["search-block__search-inp"]}
						type="text"
						placeholder="Поиск по названию"
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
				</div>

				<select
					className={styles["search-block__pagination-size-select"]}
					value={pageSize}
					onChange={e => setPageSize(Number(e.target.value))}
				>
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
				</select>

				<div className={styles["search-block__pagination-page-num"]}>
					<button
						onClick={() => setPageNum(prev => (prev > 1 ? prev - 1 : prev))}
						disabled={pageNum <= 1}
						className={styles["search-block__page-num-btn"]}
					>
						<ArrowBackIosNew />
					</button>

					<p className={styles["search-block__page-num"]}>
						{isSuccess && data.items.length > 0 ? pageNum : 0} <span>/</span>{" "}
						{isSuccess ? Math.ceil(data.total / data.size) : 0}
					</p>

					<button
						onClick={() =>
							setPageNum(prev =>
								prev < (isSuccess ? Math.ceil(data.total / data.size) : pageNum)
									? prev + 1
									: prev
							)
						}
						disabled={
							pageNum >=
							(isSuccess ? Math.ceil(data.total / data.size) : pageNum)
						}
						className={styles["search-block__page-num-btn"]}
					>
						<ArrowForwardIos />
					</button>
				</div>
			</aside>

			<section className={styles.content}>
				{isLoading && <Spinner />}

				{isError && <Error message={error.message} />}

				{isSuccess && data.items.length > 0 ? (
					<table className={styles["products-table"]}>
						<thead>
							<tr className={styles["products-table__headings"]}>
								<th className={styles["products-table__heading"]}>
									Название продукта
								</th>
								<th className={styles["products-table__heading"]}>
									Количество
								</th>
								<th className={styles["products-table__heading"]}>
									Дата последней поставки
								</th>
							</tr>
						</thead>

						<tbody>
							{data.items.map(product => (
								<tr
									key={product.id}
									className={styles["products-table__data-row"]}
								>
									<td className={styles["products-table__data-col"]}>
										{product.name}
									</td>
									<td className={styles["products-table__data-col"]}>
										{product.quantity} {getProductUnitsLabel(product.units)}
									</td>
									<td className={styles["products-table__data-col"]}>
										{formatDate(product.last_supply)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<h4 className={styles["no-content"]}>
						Пока что продуктов на складе нет
					</h4>
				)}
			</section>
		</div>
	)
}
