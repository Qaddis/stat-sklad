"use client"

import { useAtom } from "jotai"
import { motion, Variants } from "motion/react"
import NextImage from "next/image"
import NextLink from "next/link"
import { useEffect } from "react"

import PageHeading from "@/components/ui/PageHeading"
import { NavigationEnum } from "@/constants/navigation.constants"
import { advantages } from "@/data"
import { themeAtom } from "@/stores/theme.store"

import styles from "./LandingPage.module.scss"

export default function LandingPage() {
	const [isDarkTheme] = useAtom(themeAtom)

	useEffect(() => {
		const light = new Image()
		const dark = new Image()

		light.src = "/Landing_Graph_Light.png"
		dark.src = "/Landing_Graph_Dark.png"
	}, [])

	return (
		<div className={styles.page}>
			<section className={styles.landing}>
				<div className={styles.landing__info}>
					<h2 className={styles.landing__title}>СтатСклад</h2>

					<p className={styles.landing__description}>
						Эффективный учёт продуктов для ресторанов и кафе
					</p>
				</div>

				<NextImage
					className={styles.landing__img}
					src={
						isDarkTheme ? "/Landing_Graph_Dark.png" : "/Landing_Graph_Light.png"
					}
					alt="Landing image"
					width={512}
					height={512}
					priority
				/>
			</section>

			<motion.section
				className={styles.advantages}
				initial="hide"
				whileInView="show"
				variants={varitants}
				viewport={{ margin: "-100px" }}
				transition={{ ease: "easeInOut", duration: 0.25 }}
			>
				<PageHeading>Преимущества</PageHeading>

				<ol className={styles.advantages__list}>
					{advantages.map((item, idx) => (
						<motion.li
							key={`advantages-list-item-${idx}`}
							className={styles["advantages__list-item"]}
							initial="hide"
							whileInView="show"
							variants={varitants}
							viewport={{ margin: "-75px" }}
							transition={{
								duration: 0.15,
								type: "spring",
								damping: 6
							}}
						>
							<h3 className={styles["advantages__list-item__title"]}>
								{item.title}
							</h3>

							<p className={styles["advantages__list-item__description"]}>
								{item.description}
							</p>
						</motion.li>
					))}
				</ol>
			</motion.section>

			<motion.section
				className={styles["join-us"]}
				initial="hide"
				whileInView="show"
				variants={varitants}
				viewport={{ margin: "-100px" }}
				transition={{ ease: "easeInOut", duration: 0.25 }}
			>
				<PageHeading className={styles["join-us__title"]}>
					Присоединяйтесь
				</PageHeading>

				<p className={styles["join-us__description"]}>
					уже сейчас и сделайте управление складом более эффективным!
				</p>

				<NextLink
					className={styles["join-us__btn"]}
					href={NavigationEnum.LOGIN.SIGN_UP}
				>
					Присоединиться!
				</NextLink>
			</motion.section>
		</div>
	)
}

const varitants: Variants = {
	hide: {
		y: "75%",
		opacity: 0
	},
	show: {
		y: 0,
		opacity: 1
	}
}
