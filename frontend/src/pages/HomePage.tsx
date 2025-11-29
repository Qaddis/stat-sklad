"use client"

import Link from "next/link"

import NotificationCard from "@/components/features/NotificationCard"
import ProductsQuantityPlot from "@/components/features/plots/ProductsQuantityPlot"
import SuppliesCountPlot from "@/components/features/plots/SuppliesCountPlot"
import PageHeading from "@/components/ui/PageHeading"
import { NavigationEnum } from "@/constants/navigation.constants"
import { ActionTypeEnum } from "@/types/actions.types"
import { UnitsEnum } from "@/types/products.types"
import { formatDate } from "@/utils/datetime.utils"

import styles from "./HomePage.module.scss"

// FIXME:
import { actions, notifications, products, suppliesCount } from "@/data"

export default function HomePage() {
	const productsInKgs = products.filter(p => p.units === UnitsEnum.KILOGRAMS)
	const productsInPieces = products.filter(p => p.units === UnitsEnum.PIECES)

	const getTypeHeading = (type: keyof typeof ActionTypeEnum): string =>
		type === ActionTypeEnum.SUPPLY
			? "Поставка"
			: type === ActionTypeEnum.WRITE_OFF
				? "Списание"
				: type === ActionTypeEnum.TAKEN
					? "Использование"
					: "ОШИБКА"

	return (
		<div className={styles.page}>
			<PageHeading>Главная</PageHeading>

			<div className={styles["notifications-sect"]}>
				<h3 className={styles["sect-heading"]}>Уведомления</h3>

				<div className={styles.notifications}>
					{notifications.map(n => (
						<NotificationCard key={n.id} {...n} date={n.created_at} />
					))}
				</div>
			</div>

			<div className={styles["last-actions-sect"]}>
				<h3 className={styles["sect-heading"]}>Последние действия</h3>

				<table className={styles["actions-table"]}>
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
										{getTypeHeading(action.type)}
									</td>
									<td className={styles["actions-table__data-col"]}>
										{action.products.map((product, idx) =>
											idx + 1 === action.products.length
												? product.name
												: `${product.name}, `
										)}
									</td>
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
						<tr>
							<td colSpan={4} className={styles["actions-table__foot-col"]}>
								<Link href={NavigationEnum.ACTIONS.HISTORY.ALL}>
									Показать всю историю
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

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
