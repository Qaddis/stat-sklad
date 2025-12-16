type NavigationValue = string | { [key: string]: NavigationValue }

export const getStaticPaths = (
	obj: NavigationValue,
	paths: string[] = []
): string[] => {
	if (typeof obj === "string") {
		paths.push(obj)

		return paths
	}

	for (const key in obj) getStaticPaths(obj[key], paths)

	return paths
}
