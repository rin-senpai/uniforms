import { Index, Match, Switch } from 'solid-js'
import { Block, BlockVariant } from '~/components/Block'
import { createForm } from '@tanstack/solid-form'
import { useNavigate, useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Button } from '~/components/ui/button'
import QRCodeButton from '~/components/QRCodeButton'

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

export default function NewForm() {
	const params = useParams()

	const queriedForm = createQuery(() => ({
		queryKey: [`fetchForm-${params.id}`],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/forms/${params.id}`, {
				method: 'GET'
			})

			return await response.json()
		}
	}))

	const navigate = useNavigate()
	const form = createForm(() => ({
		onSubmit: async ({ value }) => {
			createQuery(() => ({
				queryKey: [`submitForm-${params.id}`],
				queryFn: async () => {
					const response = await fetch(`http://${SERVER_URL}/forms/${params.id}`, {
						method: 'POST',
						body: JSON.stringify({
							token: 'a',
							userId: 1,
							answers: {
								answers: (value as Array<any>).map((e: any, i: number) => ({
									id: i,
									response: e
								}))
							}
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					return await response.json()
				}
			}))

			navigate(`/events/${queriedForm.data.form.eventId}`, { replace: true })
		}
	}))

	return (
		<main class='flex flex-col gap-3 text-center mx-auto text-gray-700 p-4'>
			<Switch>
				<Match when={queriedForm.isPending}>Loading...</Match>
				<Match when={queriedForm.error}>what the</Match>
				<Match when={queriedForm.data !== undefined}>
					<div class='flex flex-row justify-between items-center'>
						<h2 class='m-4 text-3xl font-bold tracking-tight'>{queriedForm.data.form.title}</h2>
						<QRCodeButton link={'http://localhost:3000/forms/1/submit'} />
					</div>

					<Index each={queriedForm.data.form.fields.blocks}>
						{(block, i) => (
							<form.Field
								name={i.toString()}
								defaultValue={block().variant === 'slider' ? [(block().options.min.value + block().options.max.value) / 2] : undefined}
								children={(field) => (
									<Block
										name={field().name}
										value={field().state.value}
										onBlur={field().handleBlur}
										onInput={(e: any) => field().handleChange(e.target.value)}
										onChange={(e: any) => field().handleChange(block().variant === 'dropdown' ? e.value : e)}
										{...block()}
									/>
								)}
							/>
						)}
					</Index>
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							isSubmitting: state.isSubmitting
						})}
						children={(state) => (
							<Button class='w-full' type='submit' onClick={form.handleSubmit} disabled={!state().canSubmit}>
								{state().isSubmitting ? '...' : 'Save'}
							</Button>
						)}
					/>
				</Match>
			</Switch>
		</main>
	)
}
