import ActionDetailsPage from "@/pages/ActionDetailsPage"

export default async function ActionDetails({
	params
}: {
	params: Promise<{ actionId: string }>
}) {
	const { actionId } = await params

	return <ActionDetailsPage actionId={actionId} />
}
