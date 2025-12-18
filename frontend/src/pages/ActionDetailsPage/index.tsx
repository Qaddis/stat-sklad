"use client"

import { useQuery } from "@tanstack/react-query"

import Error from "@/components/ui/Error"
import PageHeading from "@/components/ui/PageHeading"
import Spinner from "@/components/ui/Spinner"

import historyService from "@/api/services/history.service"
import { formatDate } from "@/utils/datetime.utils"
import { getActionTypeLabel, getProductUnitsLabel } from "@/utils/labels.utils"

import styles from "./ActionDetailsPage.module.scss"

interface IProps {
	actionId: string
}

export default function ActionDetailsPage({ actionId }: IProps) {
	const { data, error, isLoading, isError, isSuccess } = useQuery({
		queryKey: ["action", actionId],
		queryFn: () => historyService.getById(actionId)
	})

	if (isLoading) return <Spinner />

	if (isError) return <Error message={error.message} />

	if (isSuccess)
		return (
			<div className={styles.page}>
				<PageHeading>
					Операция
					<br />
					{actionId.split("-")[-1]}
				</PageHeading>

				<section className={styles["action-info"]}>
					<div className={styles.info}>
						<article className={styles["info-field"]}>
							<h4>Тип действия:</h4>

							<span>{getActionTypeLabel(data.type)}</span>
						</article>

						<article className={styles["info-field"]}>
							<h4>Дата действия:</h4>

							<span>{formatDate(data.created_at)}</span>
						</article>
					</div>

					<div className={styles.products}>
						<h3>Список продуктов:</h3>

						<ol className={styles["products-list"]}>
							{data.products.map((product, idx) => (
								<li className={styles.product} key={`product-${idx}`}>
									<h4>{product.name}</h4>

									<span>
										{product.quantity} {getProductUnitsLabel(product.units)}
									</span>
								</li>
							))}
						</ol>
					</div>
				</section>
			</div>
		)
}
