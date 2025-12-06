"use client"

import { useAtom } from "jotai"
import dynamic from "next/dynamic"
import type { Data } from "plotly.js"
import { useEffect, useRef, useState } from "react"

import Spinner from "@/components/ui/Spinner"
import { themeAtom } from "@/stores/theme.store"
import { plotsColors } from "@/utils/theme.utils"

const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
	loading: () => <Spinner text="Загрузка графика..." />
})

interface IProps {
	dataInKgs: number[]
	labelsInKgs: string[]
	dataInPieces: number[]
	labelsInPieces: string[]
}

export default function ProductsQuantityPlot({
	dataInKgs,
	labelsInKgs,
	dataInPieces,
	labelsInPieces
}: IProps) {
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

	const chartDefaults: Data = {
		type: "pie",
		textinfo: "label+text",
		textposition: "inside",
		hoverinfo: "label+text+percent",
		insidetextfont: {
			size: 13,
			color: "#1c1c1c",
			family: "var(--roboto-font)"
		},
		title: {
			position: "bottom center",
			font: { size: 16, color: isDarkMode ? "#eaebed" : "#1c1c1c" }
		}
	}

	const kgsChart: Data = {
		...chartDefaults,
		values: dataInKgs,
		labels: labelsInKgs,
		title: { ...chartDefaults.title, text: "В кг." },
		text: dataInKgs.map(q => `${q} кг.`),
		domain:
			dataInPieces.length > 0
				? { x: [0, 0.48], y: [0, 1] }
				: { x: [0.25, 0.75], y: [0, 1] },
		marker: {
			colors: plotsColors
		}
	}

	const piecesChart: Data = {
		...chartDefaults,
		values: dataInPieces,
		labels: labelsInPieces,
		title: { ...chartDefaults.title, text: "В шт." },
		text: dataInPieces.map(q => `${q} шт.`),
		domain:
			dataInKgs.length > 0
				? { x: [0.52, 1], y: [0, 1] }
				: { x: [0.25, 0.75], y: [0, 1] },
		marker: {
			colors: [...plotsColors].reverse()
		}
	}

	const renderData: Data[] = []

	if (dataInKgs.length > 0) renderData.push(kgsChart)
	if (dataInPieces.length > 0) renderData.push(piecesChart)

	return (
		<div ref={containerRef} style={{ width: "100%", height: "auto" }}>
			<Plot
				data={renderData}
				layout={{
					width: dimensions.width,
					height: dimensions.height,
					title: {
						text: "Соотношение продуктов на складе",
						font: {
							family: "var(--roboto-font)",
							size: 22,
							weight: 600,
							color: isDarkMode ? "#eaebed" : "#1c1c1c"
						}
					},
					showlegend: false,
					paper_bgcolor: "transparent",
					plot_bgcolor: "transparent",
					margin: { t: 60, b: 15, l: 15, r: 15 },
					autosize: false
				}}
				config={{ responsive: true, displayModeBar: false }}
			/>
		</div>
	)
}
