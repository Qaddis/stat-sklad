import Link from "next/link"

import { NavigationEnum } from "@/constants/navigation.constants"

export default function NotFoundPage() {
	return (
		<section className="not-found-page">
			<h2>
				<i>404</i> <span>|</span> Страница не найдена!
			</h2>

			<Link href={NavigationEnum.HOME}>На главную</Link>
		</section>
	)
}
