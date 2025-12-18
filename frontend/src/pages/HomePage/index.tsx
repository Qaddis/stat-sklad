"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import NotificationCard from "@/components/features/NotificationCard"
import ProductsQuantityPlot from "@/components/features/plots/ProductsQuantityPlot"
import SuppliesCountPlot from "@/components/features/plots/SuppliesCountPlot"
import PageHeading from "@/components/ui/PageHeading"
import Spinner from "@/components/ui/Spinner"

import historyService from "@/api/services/history.service"
import notificationsService from "@/api/services/notifications.service"
import { NavigationEnum } from "@/constants/navigation.constants"
import { UnitsEnum } from "@/types/ingredients.types"
import { formatDate } from "@/utils/datetime.utils"
import { getActionTypeLabel } from "@/utils/labels.utils"

import styles from "./HomePage.module.scss"

// FIXME:
import { products, suppliesCount } from "@/data"

export default function HomePage() {
	const productsInKgs = products.filter(p => p.units === UnitsEnum.KILOGRAMS)
	const productsInPieces = products.filter(p => p.units === UnitsEnum.PIECES)

	const {
		data: notifications,
		error: notificationError,
		isError: isNotificationError,
		isLoading: isNotificationLoading,
		isSuccess: isNotificationSuccess,
		refetch: refetchNotifications
	} = useQuery({
		queryKey: ["notifications"],
		queryFn: () => notificationsService.get()
	})

	const {
		data: lastSupplies,
		error: lastSuppliesError,
		isError: isLastSuppliesError,
		isLoading: isLastSuppliesLoading,
		isSuccess: isLastSuppliesSuccess
	} = useQuery({
		queryKey: ["lastSupplies"],
		queryFn: () => historyService.getLatest()
	})

	return (
		<div className={styles.page}>
			<PageHeading>Главная</PageHeading>

			<div className={styles["notifications-sect"]}>
				<h3 className={styles["sect-heading"]}>Уведомления</h3>

				{isNotificationLoading && <Spinner />}

				{isNotificationError && (
					<p className={styles.error}>
						<span>Ошибка</span>: {notificationError.message}
					</p>
				)}

				{isNotificationSuccess && notifications.length > 0 ? (
					<div className={styles.notifications}>
						{notifications.map(n => (
							<NotificationCard
								key={n.id}
								{...n}
								refetch={refetchNotifications}
								date={n.created_at}
							/>
						))}
					</div>
				) : (
					<h4 className={styles["no-content"]}>Пока что уведомлений нет</h4>
				)}
			</div>

			<div className={styles["last-actions-sect"]}>
				<h3 className={styles["sect-heading"]}>Последние действия</h3>

				{isLastSuppliesLoading && <Spinner />}

				{isLastSuppliesError && (
					<p className={styles.error}>
						<span>Ошибка</span>: {lastSuppliesError.message}
					</p>
				)}

				{isLastSuppliesSuccess && lastSupplies.length > 0 ? (
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
							{lastSupplies.map(action => (
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
							<tr>
								<td colSpan={4} className={styles["actions-table__foot-col"]}>
									<Link href={NavigationEnum.ACTIONS.HISTORY.ALL}>
										Показать всю историю
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<h4 className={styles["no-content"]}>
						Пока что не было ни одного действия
					</h4>
				)}
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
