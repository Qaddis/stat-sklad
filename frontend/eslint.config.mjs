import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import { defineConfig, globalIgnores } from "eslint/config"

import prettierConfig from "eslint-config-prettier"
import prettier from "eslint-plugin-prettier"

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		name: "prettier",
		plugins: { prettier },
		rules: {
			"prettier/prettier": "warn"
		}
	},
	prettierConfig,
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
])

export default eslintConfig
