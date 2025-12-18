"use client"

import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

import historyService from "@/api/services/history.service"
import Error from "@/components/ui/Error"
import PageHeading from "@/components/ui/PageHeading"
import Spinner from "@/components/ui/Spinner"

import { NavigationEnum } from "@/constants/navigation.constants"
import { formatDate } from "@/utils/datetime.utils"
import { getActionTypeLabel } from "@/utils/labels.utils"

import styles from "./ActionsHistoryPage.module.scss"

export default function ActionsHistoryPage() {
	const [pageSize, setPageSize] = useState(25)
	const [pageNum, setPageNum] = useState(1)
	const [dateFrom, setDateFrom] = useState("")
	const [dateTo, setDateTo] = useState("")

	const { data, error, isLoading, isError, isSuccess } = useQuery({
		queryKey: ["actionsHistory", pageNum, pageSize, dateFrom, dateTo],
		queryFn: () =>
			historyService.getAll(pageNum - 1, pageSize, dateFrom, dateTo)
	})

	return (
		<div className={styles.page}>
			<PageHeading>История действий</PageHeading>

			<aside className={styles["search-block"]}>
				<div className={styles["search-block__search-sect"]}>
					<label htmlFor="date-from-inp">От:</label>
					<input
						className={styles["search-block__date-inp"]}
						type="date"
						id="date-from-inp"
						value={dateFrom}
						onChange={e => setDateFrom(e.target.value)}
					/>

					<label htmlFor="date-to-inp">До:</label>
					<input
						className={styles["search-block__date-inp"]}
						type="date"
						id="date-to-inp"
						value={dateTo}
						onChange={e => setDateTo(e.target.value)}
					/>
				</div>

				<select
					className={styles["search-block__pagination-size-select"]}
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
						setPageNum(1)
					}}
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
					<table className={styles["actions-table"]}>
						<colgroup>
							<col style={{ width: "15%" }} />
							<col style={{ width: "50%" }} />
							<col style={{ width: "20%" }} />
							<col style={{ width: "15%" }} />
						</colgroup>

						<thead>
							<tr className={styles["actions-table__headings"]}>
								<th className={styles["actions-table__heading"]}>Операция</th>
								<th className={styles["actions-table__heading"]}>Продукты</th>
								<th className={styles["actions-table__heading"]}>Дата</th>
								<th className={styles["actions-table__heading"]}>&nbsp;</th>
							</tr>
						</thead>

						<tbody>
							{data.items.map(action => (
								<tr
									key={action.id}
									className={styles["actions-table__data-row"]}
								>
									<td className={styles["actions-table__data-col"]}>
										{getActionTypeLabel(action.type)}
									</td>
									<td
										className={styles["actions-table__data-col"]}
										dangerouslySetInnerHTML={{
											__html: action.products.map(
												product => `<i>${product}</i>`
											)
										}}
									></td>
									<td className={styles["actions-table__data-col"]}>
										{formatDate(action.created_at)}
									</td>
									<td className={styles["actions-table__data-col"]}>
										<Link
											href={NavigationEnum.ACTIONS.HISTORY.ACTION + action.id}
										>
											Подробнее
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<h4 className={styles["no-content"]}>
						Пока что не было ни одного действия
					</h4>
				)}
			</section>
		</div>
	)
}
