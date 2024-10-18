import { Button } from '~/components/ui/button'
import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel, TextFieldTextArea } from '~/components/ui/text-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { createSignal, Show, Suspense } from 'solid-js'
import { Organisation } from '../../../../../../../server/src/interface'
import { createForm } from '@tanstack/solid-form'
import { createQuery, QueryClient } from '@tanstack/solid-query'
import { useNavigate, useParams } from '@solidjs/router'
import { QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { createStore } from 'solid-js/store'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

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

	const eventQuery = createQuery(() => ({
		queryKey: ['data'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/events/${params.eventId}`, {
				method: 'GET'
			})

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()

			return {
				title: body.event.title,
                description: body.event.description,
                isPublic: body.event.isPublic,
                timeStart: body.event.timeStart,
                timeEnd: body.event.timeEnd,
                location: body.event.location,
                bannerURI: body.event.bannerURI

			}
		}
	}))

    const orgQuery = createQuery(() => ({
		queryKey: ['org'],
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
		}
	}))

	const form = createForm(() => ({
		defaultValues: {
			name: eventQuery.data?.title,
            description: eventQuery.data?.description,
            visibility: eventQuery.data?.isPublic ? 'Public' : 'Private',
            timeStart: eventQuery.data?.timeStart * 1000,
            timeEnd: eventQuery.data?.timeEnd * 1000,
            location: eventQuery.data?.location,
            banner: eventQuery.data?.bannerURI
		},

		onSubmit: async ({ value }) => {
			console.log(value)
			const response = await fetch(`http://${SERVER_URL}/admin/events/${params.eventId}`, {
				method: 'PUT',
				body: JSON.stringify({
					token: 'a',
					title: value.name,
					description: value.description,
					isPublic: value.visibility === 'Public' ? true : false,
					timeStart: Math.floor(value.timeStart / 1000),
					timeEnd: Math.floor(value.timeEnd / 1000),
					location: value.location,
					bannerURI: value.banner
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(() => navigate(`/society/${params.id}/events/${params.eventId}/edit`, { replace: false })
            ).catch((value) => {throw new Error(`Response failed.`)})

		}
	}))

	const [banner, setBanner] = createSignal('')
	const onBannerUpload = (e: Event) => {
		const target = e.target as HTMLInputElement
		const file = target.files?.[0]

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setBanner(reader.result as string)
				form.setFieldValue('banner', reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

    console.log(form.state.values)

	// const onFormSelect = (e: Event) => {
	// 	const target = e.target as HTMLInputElement;
	// 	const value = target.value
	// }

	// const onSubmitWrapper = (e: SubmitEvent) => {
	// 	e.preventDefault()
	// 	e.stopPropagation()
	// 	form.handleSubmit()
	// }

	return (
		<Suspense fallback={'Loading...'}>
			<div class='flex flex-col gap-2 m-6 w-full'>
				<h2 class='text-3xl font-bold tracking-tight'>Edit event</h2>
                <div class='flex flex-row items-center'>
                 <h3 class='text-xl font-bold tracking-tight'>Belongs to {orgQuery.data?.name}</h3>
                 <Avatar>
                    <AvatarImage src={orgQuery.data?.avatarURI} />
                    <AvatarFallback>EK</AvatarFallback>
                </Avatar>
                </div>
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
								name='banner'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please upload an event banner!' : undefined)
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

							<form.Field
								name='location'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please enter a location!' : undefined)
								}}
								children={(field) => (
									<TextField class='w-full' name={field().name} onInput={(e) => field().handleChange(e.target.value)} validationState={field().state.value == '' ? 'invalid' : 'valid'}>
										<TextFieldLabel>Location</TextFieldLabel>
										<TextFieldInput class='w-full' type='text' name={field().name} value={field().state.value} />
										<Show when={field().state.meta.errors}>
											<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
										</Show>
									</TextField>
								)}
							/>

							<form.Field
								name='visibility'
								validators={{
									onChangeAsync: async ({ value }) => (value === '' ? 'Please enter a location!' : undefined)
								}}
								children={(field) => (
									<div>
										<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Visibility</label>
										<Select
											name={field().name}
											value={field().state.value}
											onChange={(e) => form.setFieldValue(field().name, e as string)}
											options={['Public', 'Private']}
											placeholder='Select event visibility'
											itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
										>
											<SelectTrigger aria-label='Event Visibility' class='w-[180px]'>
												<SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
											</SelectTrigger>
											<SelectContent />
										</Select>
									</div>
								)}
							/>

							<form.Field
								name='timeStart'
								validators={{
									onChangeAsync: async ({ value }) => (isNaN(new Date(value).getTime()) ? 'Please enter a start date!' : undefined)
								}}
								children={(field) => (
									<TextField name={field().name} validationState={isNaN(new Date(field().state.value).getTime()) ? 'invalid' : 'valid'} class='gap-4 w-full'>
											<TextFieldLabel>Start Date</TextFieldLabel>
											<input
												class='flex h-10 w-1/2 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
												name={field().name}
												type='datetime-local'
												value={isNaN(new Date(field().state.value).getTime()) ? new Date().toISOString().slice(0, -8) : new Date(field().state.value).toISOString().slice(0, -8)}
												onChange={(e) => {form.setFieldValue(field().name, e.target.value)}}
											/>
											<Show when={field().state.meta.errors}>
												<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
											</Show>
										</TextField>
								)}
							/>
                            
							<form.Field
								name='timeEnd'
								validators={{
									onChangeAsync: async ({ value }) => (isNaN(new Date(value).getTime()) ? 'Please enter a end date!' : undefined)
								}}
								children={(field) => (
									<TextField name={field().name} validationState={isNaN(new Date(field().state.value).getTime()) ? 'invalid' : 'valid'} class='gap-4 w-full'>
											<TextFieldLabel>End Date</TextFieldLabel>
											<input
												class='flex h-10 w-1/2 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
												name={field().name}
												type='datetime-local'
												value={isNaN(new Date(field().state.value).getTime()) ? new Date().toISOString().slice(0, -8) : new Date(field().state.value).toISOString().slice(0, -8)}
												onChange={(e) => {console.log(new Date(e.target.value));form.setFieldValue(field().name, e.target.value)}}
											/>
											<Show when={field().state.meta.errors}>
												<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
											</Show>
										</TextField>
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

							<Button onClick={() => console.log(form.state.values)}>Print</Button>
						</div>
					</div>

					<div class='flex flex-col gap-8'>
						<div class='flex flex-col gap-4'>
							<h2 class='text-xl font-bold tracking-tight'>Event Banner</h2>
							<img src={banner()} class='rounded-lg max-h-60 max-w-96 h-auto w-auto object-scale-down' />
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}
