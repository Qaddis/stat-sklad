import { redirect } from "next/navigation"

import ActionDetailsPage from "@/pages/ActionDetailsPage"

// FIXME:
import { actions } from "@/data"

export default async function ActionDetails({
	params
}: {
	params: Promise<{ actionId: string }>
}) {
	const { actionId } = await params

	// FIXME:
	const actionData = actions.find(action => action.id === actionId)

	if (actionData) return <ActionDetailsPage {...actionData} />
	else redirect("/not-found")
}
