import { Button } from '~/components/ui/button'
import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel, TextFieldTextArea } from '~/components/ui/text-field'
import { createEffect, createSignal, onMount, Show, Suspense } from 'solid-js'
import { createForm } from '@tanstack/solid-form'
import { createQuery, QueryClient } from '@tanstack/solid-query'
import { useNavigate, useParams } from '@solidjs/router'
import { QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { createStore } from 'solid-js/store'
import { showToast, Toaster } from "~/components/ui/toast"

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

const queryClient = new QueryClient()

export default function Edit() {
	return (
		<QueryClientProvider client={queryClient}>
			<EditQuery />
			<SolidQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

function EditQuery() {
	const navigate = useNavigate()
	const params = useParams()

	const query = createQuery(() => ({
		queryKey: ['data'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/orgs/${params.id}`, {
				method: 'GET'
			})

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()

			return {
				name: body.organisation.name,
				description: body.organisation.description,
				avatarURI: body.organisation.avatarURI,
				bannerURI: body.organisation.bannerURI
			}
		},
		refetchOnWindowFocus: true, // Refetch when window gains focus
    	refetchOnMount: true, // Refetch when the component mounts
	}))

	createEffect(() => {
		const isAllSuccess = query.isSuccess
		const isAnyLoading = query.isLoading 
		if (isAllSuccess) {
			form.setFieldValue('name', query.data?.name)
			form.setFieldValue('description', query.data?.description)
			form.setFieldValue('avatar', query.data?.avatarURI)
			form.setFieldValue('banner', query.data?.bannerURI)
			setImageStore({ avatar: query.data?.avatarURI, banner: query.data?.bannerURI })
		}
	})

	const form = createForm(() => ({
		defaultValues: {
			name: query.data?.name,
			description: query.data?.description,
			avatar: query.data?.avatarURI,
			banner: query.data?.bannerURI
		},

		onSubmit: async ({ value }) => {
			console.log(value)
			const response = await fetch(`http://${SERVER_URL}/admin/orgs/${params.id}`, {
				method: 'PUT',
				body: JSON.stringify({
					token: 'a',
					name: value.name,
					description: value.description,
					avatarURI: value.avatar,
					bannerURI: value.banner
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(() => {
					setIsEdited(true);
					localStorage.setItem('organisationEdited', JSON.stringify(isEdited()));
					navigate(`/orgs/${params.id}/edit`, { replace: false })
					location.reload()
				})
				.catch((value) => {
					showToast({title: "Uh-oh...", description: "Failed to edit the society...", variant: 'error'})
					throw new Error(`Response failed.`)
				})
		}
	}))

	const [imageStore, setImageStore] = createStore({ avatar: query.data?.avatarURI, banner: query.data?.bannerURI })

	const onAvatarUpload = (e: Event) => {
		const target = e.target as HTMLInputElement
		const file = target.files?.[0]

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImageStore('avatar', reader.result as string)
				form.setFieldValue('avatar', reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const onBannerUpload = (e: Event) => {
		const target = e.target as HTMLInputElement
		const file = target.files?.[0]

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImageStore('banner', reader.result as string)
				form.setFieldValue('banner', reader.result as string)
			}
			reader.readAsDataURL(file)
			console.log(form.state.values.banner)
		}
	}

	const [isEdited, setIsEdited] = createSignal(false);

	// Check local storage on mount to set the initial state
	onMount(() => {
		const savedVisibility = localStorage.getItem('organisationEdited');
		if (savedVisibility === 'true') {
			showToast({title: "Wahoo!", description: "Successfully edited the society", variant: 'success'})
			setIsEdited(false);
			localStorage.setItem('organisationEdited', JSON.stringify(isEdited()));
		}
	});

	return (
		<Suspense fallback={'Loading society'}>
			<div class='flex flex-col gap-2 m-6 w-full'>
				<h2 class='text-3xl font-bold tracking-tight'>{query.data?.name}</h2>

				<div class='mx-10 my-5 flex flex-row w-full gap-8'>
					<div class='flex flex-col gap-4 w-1/2'>
						<form
							class='flex flex-col gap-4 w-full'
							onSubmit={(e) => {
								e.preventDefault()
								e.stopPropagation()
							}}
						>
							<form.Field
								name='name'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please enter a name!' : undefined)
								}}
								children={(field) => (
									<TextField class='w-full' name={field().name} onInput={(e) => field().handleChange(e.target.value)} validationState={field().state.value == '' ? 'invalid' : 'valid'}>
										<TextFieldLabel>Name</TextFieldLabel>
										<TextFieldInput class='w-full' type='text' name={field().name} value={field().state.value} />
										<Show when={field().state.meta.errors}>
											<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
										</Show>
									</TextField>
								)}
							/>

							<form.Field
								name='description'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please enter a description!' : undefined)
								}}
								children={(field) => (
									<TextField class='w-full' name={field().name} onInput={(e) => field().handleChange(e.target.value)} validationState={field().state.value == '' ? 'invalid' : 'valid'}>
										<TextFieldLabel>Description</TextFieldLabel>
										<TextFieldTextArea class='w-full' value={field().state.value} name={field().name} autoResize />
										<Show when={field().state.meta.errors}>
											<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
										</Show>
									</TextField>
								)}
							/>

							<form.Field
								name='avatar'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please upload a society avatar!' : undefined)
								}}
								children={(field) => (
									<>
										<TextField name={field().name} validationState={field().state.value == '' ? 'invalid' : 'valid'} class='gap-4 w-full'>
											<TextFieldLabel>Avatar</TextFieldLabel>
											<input
												class='flex h-10 w-1/2 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
												name={field().name}
												type='file'
												accept='image/*'
												onChange={onAvatarUpload}
											/>
											<Show when={field().state.meta.errors}>
												<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
											</Show>
										</TextField>
									</>
								)}
							/>

							<form.Field
								name='banner'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please upload a society banner!' : undefined)
								}}
								children={(field) => (
									<>
										<TextField name={field().name} validationState={field().state.value == '' ? 'invalid' : 'valid'} class='gap-4 w-full'>
											<TextFieldLabel>Banner</TextFieldLabel>
											<input
												class='flex h-10 w-1/2 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
												name={field().name}
												type='file'
												accept='image/*'
												onChange={onBannerUpload}
											/>
											<Show when={field().state.meta.errors}>
												<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
											</Show>
										</TextField>
									</>
								)}
							/>

							{/* <TextField class='gap-4'>
				<TextFieldLabel>Banner</TextFieldLabel>

				<input type="file" accept="image/*" onChange={onBannerUpload}/>
			</TextField>

			<img src={banner()} class='rounded-lg h-60'/> */}
						</form>
						<div class='flex flex-row items-center gap-2'>
							<Button type='reset'>Reset</Button>

							<Button onClick={form.handleSubmit}>Submit</Button>

							<Button as='a' href={`/orgs/${params.id}`}>Back</Button>
						</div>
					</div>

					<div class='flex flex-col gap-8'>
						<div class='flex flex-col gap-4 items-start'>
							<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Avatar</label>
							<img src={imageStore.avatar} class='rounded-lg max-h-60 max-w-60 h-auto w-auto object-scale-down' />
						</div>

						<div class='flex flex-col gap-4 items-start'>
							<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Banner</label>
							<img src={imageStore.banner} class='rounded-lg max-h-60 max-w-60 h-auto w-auto object-scale-down' />
						</div>
					</div>
				</div>
			</div>
			<Toaster/>
		</Suspense>
	)
}
