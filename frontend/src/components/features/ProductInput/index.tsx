"use client"

import { useRef, useState, type InputHTMLAttributes } from "react"
import {
	useController,
	type Control,
	type RegisterOptions
} from "react-hook-form"

import { products } from "@/data"
import styles from "./ProductInput.module.scss"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>
	rules?: RegisterOptions
}

export default function ProductInput({
	className,
	onFocus: propOnFocus,
	onBlur: propOnBlur,
	onChange: propOnChange,
	name,
	control,
	rules,
	...restProps
}: IProps) {
	const {
		field: { value: hiddenValue, onChange: setHiddenValue },
		fieldState: { error }
	} = useController({ control, name, rules })

	const inputRef = useRef<HTMLInputElement>(null)

	const [isActive, setIsActive] = useState<boolean>(false)
	const [hints, setHints] = useState<{ id: string; name: string }[]>([])
	const [inputValue, setInputValue] = useState<string>("")

	const displayValue =
		inputValue ||
		(hiddenValue ? (products.find(p => p.id === hiddenValue)?.name ?? "") : "")

	// FIXME:
	const updateHints = (value: string): void => {
		setHints(
			products
				.filter(product =>
					product.name.toLowerCase().includes(value.toLowerCase())
				)
				.map(product => ({ id: product.id, name: product.name }))
		)
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsActive(true)

		updateHints(
			inputValue ||
				(hiddenValue
					? (products.find(p => p.id === hiddenValue)?.name ?? "")
					: "")
		)

		propOnFocus?.(e)
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsActive(false)

		propOnBlur?.(e)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value

		setInputValue(newValue)

		if (hiddenValue) setHiddenValue("")

		updateHints(newValue)

		propOnChange?.(e)
	}

	const handleSelectProduct = (productId: string, productName: string) => {
		setHiddenValue(productId)
		setInputValue(productName)

		setIsActive(false)

		inputRef.current?.focus()
	}

	const handleNewProduct = () => {
		console.log("Создание нового продукта")

		setIsActive(false)

		setInputValue("")
	}

	const getClassName = (): string =>
		className
			? `${styles["product-input"]} ${className}`
			: styles["product-input"]

	return (
		<div
			className={styles["product-input-container"]}
			onClick={e => e.stopPropagation()}
		>
			<input
				type="hidden"
				name={name}
				value={hiddenValue || ""}
				aria-invalid={error ? "true" : "false"}
				readOnly
			/>

			<input
				{...restProps}
				ref={inputRef}
				value={displayValue}
				className={getClassName()}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleInputChange}
			/>

			{isActive && (
				<ul className={styles["product-search-menu"]}>
					{hints.length > 0 ? (
						hints.map(hint => (
							<li key={hint.id}>
								<button
									className={styles["hint-btn"]}
									onMouseDown={e => {
										e.preventDefault()
										handleSelectProduct(hint.id, hint.name)
									}}
									type="button"
								>
									{hint.name}
								</button>
							</li>
						))
					) : (
						<li>
							<button
								className={styles["no-hints-btn"]}
								onMouseDown={e => {
									e.preventDefault()
									handleNewProduct()
								}}
								type="button"
							>
								Добавить продукт
							</button>
						</li>
					)}
				</ul>
			)}
		</div>
	)
}
