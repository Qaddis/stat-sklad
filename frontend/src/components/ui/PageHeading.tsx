import type {
	DetailedHTMLProps,
	HTMLAttributes,
	PropsWithChildren
} from "react"

import styles from "./PageHeading.module.scss"

interface IProps
	extends PropsWithChildren,
		DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {}

export default function PageHeading({ children, className, ...props }: IProps) {
	return (
		<h2
			className={className ? `${styles.header} ${className}` : styles.header}
			{...props}
		>
			{children}
		</h2>
	)
}
