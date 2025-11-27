"use client"

import { useAtom } from "jotai"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

import { themeAtom } from "@/stores/theme.store"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface IProps {
	data: number[]
}

export default function SuppliesCountPlot({ data }: IProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [dimensions, setDimensions] = useState({ width: 800, height: 400 })

	const [isDarkMode] = useAtom(themeAtom)

	useEffect(() => {
		if (!containerRef.current) return

		const updateDimensions = () => {
			if (containerRef.current) {
				const width = containerRef.current.clientWidth

				setDimensions({ width, height: width * 0.45 })
			}
		}
		updateDimensions()

		const resizeObserver = new ResizeObserver(updateDimensions)
		resizeObserver.observe(containerRef.current)

		return () => resizeObserver.disconnect()
	}, [])

	const monthsValues: number[] = Array.from({ length: 12 }, (_, i) => i + 1)

	const monthsLabels: string[] = [
		"Янв",
		"Фев",
		"Мар",
		"Апр",
		"Май",
		"Июн",
		"Июл",
		"Авг",
		"Сен",
		"Окт",
		"Ноя",
		"Дек"
	]

	return (
		<div ref={containerRef} style={{ width: "100%", height: "auto" }}>
			<Plot
				data={[
					{
						type: "scatter",
						x: monthsValues,
						y: data,
						line: {
							width: 2,
							color: "#11998e",
							shape: "spline"
						},
						marker: {
							size: 6,
							color: "#1eb589"
						}
					}
				]}
				layout={{
					width: dimensions.width,
					height: dimensions.height,
					title: {
						text: "Кол-во поставок в году",
						font: {
							family: "var(--roboto-font)",
							size: 22,
							weight: 600,
							color: isDarkMode ? "#eaebed" : "#1c1c1c"
						}
					},
					xaxis: {
						title: {
							text: "Месяц",
							font: { color: isDarkMode ? "#eaebed" : "#1c1c1c" }
						},
						tickmode: "array",
						tickvals: monthsValues,
						ticktext: monthsLabels,
						tickfont: {
							family: "var(--roboto-font)",
							color: isDarkMode ? "#eaebed" : "#1c1c1c",
							size: 12
						},
						gridwidth: 1,
						gridcolor: isDarkMode ? "#eaebed75" : "#1c1c1c75"
					},
					yaxis: {
						title: {
							text: "Кол-во поставок",
							font: { color: isDarkMode ? "#eaebed" : "#1c1c1c" }
						},
						rangemode: "tozero",
						tickmode: "linear",
						tickfont: {
							family: "var(--roboto-font)",
							color: isDarkMode ? "#eaebed" : "#1c1c1c",
							size: 12
						},
						gridwidth: 1,
						gridcolor: isDarkMode ? "#eaebed75" : "#1c1c1c75",
						zerolinecolor: isDarkMode ? "#eaebed75" : "#1c1c1c75"
					},
					showlegend: false,
					paper_bgcolor: "transparent",
					plot_bgcolor: "transparent",
					margin: { t: 60, b: 35, l: 35, r: 15 },
					autosize: false
				}}
				config={{ responsive: true, staticPlot: true }}
			/>
		</div>
	)
}
