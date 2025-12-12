"use client"

import { ArrowBackIosNew, ArrowForwardIos, Search } from "@mui/icons-material"
import Link from "next/link"

import PageHeading from "@/components/ui/PageHeading"
import { NavigationEnum } from "@/constants/navigation.constants"
import { formatDate } from "@/utils/datetime.utils"
import { getActionTypeLabel } from "@/utils/labels.utils"

import styles from "./ActionsHistoryPage.module.scss"

// FIXME:
import { actions } from "@/data"

export default function ActionsHistoryPage() {
	return (
		<div className={styles.page}>
			<PageHeading>История операций</PageHeading>

			<aside className={styles["search-block"]}>
				<div className={styles["search-block__search-sect"]}>
					<label htmlFor="date-from-inp">От:</label>
					<input
						className={styles["search-block__date-inp"]}
						type="date"
						id="date-from-inp"
					/>

					<label htmlFor="date-to-inp">До:</label>
					<input
						className={styles["search-block__date-inp"]}
						type="date"
						id="date-to-inp"
					/>

					<button className={styles["search-block__search-btn"]}>
						<Search />
					</button>
				</div>

				<select
					defaultValue="25"
					className={styles["search-block__pagination-size-select"]}
				>
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
				</select>

				<div className={styles["search-block__pagination-page-num"]}>
					<button className={styles["search-block__page-num-btn"]}>
						<ArrowBackIosNew />
					</button>

					<p className={styles["search-block__page-num"]}>
						1 <span>/</span> 5
					</p>

					<button className={styles["search-block__page-num-btn"]}>
						<ArrowForwardIos />
					</button>
				</div>
			</aside>

			<section className={styles.content}>
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
						{actions
							.sort(
								(a, b) =>
									new Date(b.created_at).getTime() -
									new Date(a.created_at).getTime()
							)
							.map(action => (
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
												product => `<i>${product.name}</i>`
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
			</section>
		</div>
	)
}
