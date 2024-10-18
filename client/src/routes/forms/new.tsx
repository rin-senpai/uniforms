import { Index, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { EditBlock, BlockVariant } from '~/components/EditBlock'
import { createForm } from '@tanstack/solid-form'
import { useNavigate } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import Plus from 'lucide-solid/icons/plus'
import QRCodeButton from '~/components/QRCodeButton'

export default function NewForm() {
	const [blocks, setBlocks] = createStore<
		Array<{
			templateId?: number
			header: string
			description?: string
			options?: any
		}>
	>([
		{
			header: 'This is a very real and serious question?',
			description: 'or is it'
		}
	])

	const addBlock = (block: any) => {
		setBlocks([...blocks, block])
	}

	const navigate = useNavigate()
	const form = createForm(() => ({
		onSubmit: async ({ value }) => {
			// const newForm = createQuery(() => ({
			// 	queryKey: ['idk'],
			// 	queryFn: async () => {
			// 		const response = await fetch('http://localhost:60000/api/submit', {
			// 			method: 'POST',
			// 			body: JSON.stringify(value),
			// 			headers: {
			// 				'Content-Type': 'application/json'
			// 			}
			// 		})

			// 		return await response.json()
			// 	}
			// }))

			// navigate(`/forms/${newForm}/edit`, { replace: true })
			console.log(value)
		}
	}))

	return (
		<main class='flex flex-col gap-3 text-center mx-auto text-gray-700 p-4'>
			<div class='flex flex-row justify-between items-center'>
				<h2 class='m-4 text-3xl font-bold tracking-tight'>New Form</h2>
				<QRCodeButton link={'http://localhost:3000/forms/1/submit'} />
			</div>

			<Index each={blocks}>
				{(block, i) => {
					const [variant, setVariant] = createSignal('short')

					return (
						<form.Field
							name={i.toString()}
							mode='array'
							defaultValue={variant() === 'slider' ? [(block().options.min.value + block().options.max.value) / 2] : undefined}
							children={(field) => (
								<EditBlock name={field().name} variant={variant} setVariant={setVariant} value={field().state.value} onBlur={field().handleBlur} onInput={(e: any) => field().handleChange(e.target.value)} {...block()} />
							)}
						/>
					)
				}}
			</Index>
			<div class='flex flex-row justify-between gap-3'>
				<Button
					class='w-full'
					variant={'secondary'}
					onClick={() =>
						addBlock({
							header: 'This is a very real and serious question?',
							description: 'or is it'
						})
					}
				>
					<Plus size={24} />
					New Block
				</Button>
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
			</div>
		</main>
	)
}
