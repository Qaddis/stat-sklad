"use client"

import PageHeading from "@/components/ui/PageHeading"
import { IAction } from "@/types/actions.types"
import { formatDate } from "@/utils/datetime.utils"
import { getActionTypeLabel, getProductUnitsLabel } from "@/utils/labels.utils"

import styles from "./ActionDetailsPage.module.scss"

export default function ActionDetailsPage(props: IAction) {
	return (
		<div className={styles.page}>
			<PageHeading>
				Операция
				<br />
				{props.id}
			</PageHeading>

			<section className={styles["action-info"]}>
				<div className={styles.info}>
					<article className={styles["info-field"]}>
						<h4>Тип действия:</h4>

						<span>{getActionTypeLabel(props.type)}</span>
					</article>

					<article className={styles["info-field"]}>
						<h4>Дата действия:</h4>

						<span>{formatDate(props.created_at)}</span>
					</article>
				</div>

				<div className={styles.products}>
					<h3>Список продуктов:</h3>

					<ol className={styles["products-list"]}>
						{props.products.map((product, idx) => (
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
