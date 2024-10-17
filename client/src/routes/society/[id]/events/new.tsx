import { Button } from '~/components/ui/button'
import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel, TextFieldTextArea } from '~/components/ui/text-field'
import { createEffect, createSignal, Show } from 'solid-js'
import { Organisation } from '../../../../../../server/src/interface'
import { createForm } from '@tanstack/solid-form'
import { redirect, useNavigate, useParams } from '@solidjs/router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

import { NumberField, NumberFieldDecrementTrigger, NumberFieldErrorMessage, NumberFieldGroup, NumberFieldIncrementTrigger, NumberFieldInput } from '~/components/ui/number-field'
import { createStore } from 'solid-js/store'

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

export default function New() {
	const navigate = useNavigate()
	const params = useParams()
	const form = createForm(() => ({
		defaultValues: {
			name: '',
			description: '',
			visibility: 'Public',
			timeStart: Math.floor(Date.now() / 1000),
			timeEnd: Math.floor(Date.now() / 1000 + 3600),
			location: '',
			banner: ''
		},

		onSubmit: async ({ value }) => {
			const response = await fetch(`http://${SERVER_URL}/admin/events`, {
				method: 'POST',
				body: JSON.stringify({
					token: 'a',
					organisationId: params.id,
					title: value.name,
					description: value.description,
					isPublic: value.visibility === 'Public' ? true : false,
					timeStart: value.timeStart,
					timeEnd: value.timeEnd,
					location: value.location,
					bannerURI: value.banner
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()

			navigate(`/society/${params.id}/events/${body.eventId}`, { replace: true })
		}
	}))

	const onBannerUpload = (e: Event) => {
		const target = e.target as HTMLInputElement
		const file = target.files?.[0]

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				form.setFieldValue('banner', reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const prefixWithZero = (num: number) => {
		return num < 10 ? '0' + num : num.toString()
	}

	const [currentDateState, setCurrentDateState] = createStore({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		day: new Date().getDate(),
		hour: new Date().getHours(),
		minute: new Date().getMinutes()
	})

	const [endDateState, setEndDateState] = createStore({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		day: new Date().getDate(),
		hour: (new Date().getHours() + 1) % 24,
		minute: new Date().getMinutes()
	})

	createEffect(() => {
		onStartDateUpdate(currentDateState.year, currentDateState.month, currentDateState.day, currentDateState.hour, currentDateState.minute)
	})

	createEffect(() => {
		onEndDateUpdate(endDateState.year, endDateState.month, endDateState.day, endDateState.hour, endDateState.minute)
	})

	const isValidDate = (day: number, month: number, year: number) => {
		// Create a date object with the provided day, month (0-indexed), and year
		const date = new Date(year, month - 1, day) // month is 0-indexed in Date object
		return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
	}

	const getMonthName = (monthNumber: number) => {
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		// Ensure the month number is between 1 and 12
		if (monthNumber < 1 || monthNumber > 12) {
			return null // or throw an error, or return a default value
		}

		return monthNames[monthNumber - 1] // monthNumber is 1-indexed
	}

	const getMonthNumber = (monthName: string) => {
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		// Find the index of the month name
		const monthIndex = monthNames.indexOf(monthName)

		// Return the month number (1-12) or null if not found
		return monthIndex !== -1 ? monthIndex + 1 : 0 // +1 to convert from 0-indexed to 1-indexed
	}

	const onStartDateUpdate = (year: number, month: number, day: number, hour: number, minute: number) => {
		const dateString = `${year}-${prefixWithZero(month)}-${prefixWithZero(day)}T${prefixWithZero(hour)}:${prefixWithZero(minute)}:00Z` // Example date string in ISO format
		const date = new Date(dateString) // Convert string to Date object
		const timestamp = Math.floor(date.getTime() / 1000) // Convert to UNIX timestamp (seconds)
		form.setFieldValue('timeStart', timestamp as number)
	}

	const onEndDateUpdate = (year: number, month: number, day: number, hour: number, minute: number) => {
		const dateString = `${year}-${prefixWithZero(month)}-${prefixWithZero(day)}T${prefixWithZero(hour)}:${prefixWithZero(minute)}:00Z` // Example date string in ISO format
		const date = new Date(dateString) // Convert string to Date object
		const timestamp = Math.floor(date.getTime() / 1000) // Convert to UNIX timestamp (seconds)
		form.setFieldValue('timeEnd', timestamp as number)
	}

	// const onFormSelect = (e: Event) => {
	// 	const target = e.target as HTMLInputElement;
	// 	const value = target.value
	// }

	// const onSubmitWrapper = (e: SubmitEvent) => {
	// 	e.preventDefault()
	// 	e.stopPropagation()
	// 	form.handleSubmit()
	// }

	const [value, setValue] = createSignal('')
	return (
		<>
			<div class='flex flex-col gap-2 m-6 w-full'>
				<h2 class='text-3xl font-bold tracking-tight'>Create new event</h2>

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
									onChangeAsync: async ({ value }) => (value === 0 ? 'Please enter a date!' : undefined)
								}}
								children={(field) => (
									<div class='flex flex-row gap-4'>
										<div>
											<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Day</label>
											<NumberField
												name={field().name + 'Day'}
												value={currentDateState.day}
												class='flex w-36 flex-col gap-2'
												onRawValueChange={(value) => setCurrentDateState('day', value)}
												validationState={isValidDate(currentDateState.year, currentDateState.month, currentDateState.day) ? 'invalid' : 'valid'}
											>
												<NumberFieldGroup>
													<NumberFieldInput />
													<NumberFieldIncrementTrigger />
													<NumberFieldDecrementTrigger />
												</NumberFieldGroup>
												<NumberFieldErrorMessage>Invalid date!</NumberFieldErrorMessage>
											</NumberField>
										</div>

										<div>
											<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Month</label>
											<Select
												name={field().name + 'Month'}
												value={getMonthName(currentDateState.month)}
												onChange={(value) => setCurrentDateState('month', getMonthNumber(value as string))}
												options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
												validationState={isValidDate(currentDateState.year, currentDateState.month, currentDateState.day) ? 'invalid' : 'valid'}
												placeholder='Select month'
												itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
											>
												<SelectTrigger aria-label='Month' class='w-[180px]'>
													<SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
												</SelectTrigger>
												<SelectContent />
											</Select>
										</div>

										<div>
											<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Year</label>
											<NumberField
												name={field().name + 'Year'}
												value={currentDateState.year}
												class='flex w-36 flex-col gap-2'
												onRawValueChange={(value) => setCurrentDateState('year', value)}
												validationState={isValidDate(currentDateState.year, currentDateState.month, currentDateState.day) ? 'invalid' : 'valid'}
											>
												<NumberFieldGroup>
													<NumberFieldInput />
													<NumberFieldIncrementTrigger />
													<NumberFieldDecrementTrigger />
												</NumberFieldGroup>
												<NumberFieldErrorMessage>Invalid date!</NumberFieldErrorMessage>
											</NumberField>
										</div>

										<div>
											<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Hour</label>
											<NumberField name={field().name + 'Hour'} value={prefixWithZero(currentDateState.hour)} class='flex w-36 flex-col gap-2' onRawValueChange={(value) => value !== null ? setCurrentDateState('hour', ((value % 24) + 24) % 24) : setCurrentDateState('hour', 0)}>
												<NumberFieldGroup>
													<NumberFieldInput />
													<NumberFieldIncrementTrigger />
													<NumberFieldDecrementTrigger />
												</NumberFieldGroup>
												<NumberFieldErrorMessage>Invalid date!</NumberFieldErrorMessage>
											</NumberField>
										</div>
											
										<div>
											<label class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Minute</label>
											<NumberField name={field().name + 'Minute'} value={prefixWithZero(currentDateState.minute)} class='flex w-36 flex-col gap-2' onRawValueChange={(value) => {console.log(value); setCurrentDateState('minute', ((value % 60) + 60) % 60)}}>
												<NumberFieldGroup>
													<NumberFieldInput />
													<NumberFieldIncrementTrigger />
													<NumberFieldDecrementTrigger />
												</NumberFieldGroup>
												<NumberFieldErrorMessage>Invalid date!</NumberFieldErrorMessage>
											</NumberField>
										</div>
										
									</div>
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
							<img src={form.state.values.banner} class='rounded-lg h-60 w-60' />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
