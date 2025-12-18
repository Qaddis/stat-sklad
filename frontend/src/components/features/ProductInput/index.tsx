"use client"

import { useAtom } from "jotai"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState, type InputHTMLAttributes } from "react"
import {
	useController,
	type Control,
	type RegisterOptions
} from "react-hook-form"

import ingredientsService from "@/api/services/ingredients.service"
import { newProductModalAtom } from "@/stores/newProductModal.store"

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
	const [hintsError, setHintsError] = useState<string | null>(null)

	const [_, setNewProductModalState] = useAtom(newProductModalAtom)

	const displayValue =
		inputValue ||
		(hiddenValue ? (hints.find(p => p.id === hiddenValue)?.name ?? "") : "")

	const updateHints = async (value: string): Promise<void> => {
		setHintsError(null)

		const response = await ingredientsService.get(value)

		if (response.status === 200 && response.data) setHints(response.data)
		else {
			setHints([])

			setHintsError(response.error!)
		}
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsActive(true)

		updateHints(
			inputValue ||
				(hiddenValue ? (hints.find(p => p.id === hiddenValue)?.name ?? "") : "")
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
		setNewProductModalState(true)

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

			<AnimatePresence>
				{isActive && (
					<motion.ul
						className={styles["product-search-menu"]}
						initial={{
							height: "0",
							opacity: 0
						}}
						animate={{
							height: "auto",
							opacity: 1
						}}
						exit={{
							height: "0",
							opacity: 0
						}}
						transition={{
							height: { duration: 0.2, ease: "easeInOut" },
							opacity: { duration: 0.4 }
						}}
					>
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
										title={hint.name}
									>
										{hint.name}
									</button>
								</li>
							))
						) : !hintsError ? (
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
						) : (
							<li>
								<h4 className={styles["hints-error"]}>Ошибка: {hintsError}</h4>
							</li>
						)}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
