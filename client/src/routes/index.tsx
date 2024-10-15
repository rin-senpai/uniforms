import { A } from '@solidjs/router'
import Counter from '~/components/Counter'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Switch, SwitchControl, SwitchThumb } from '~/components/ui/switch'
import { createSignal, For } from 'solid-js'
import { Checkbox } from '~/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const [value, setValue] = createSignal('')

// Notifications data
const notifications = [
	{
		title: 'Your call has been confirmed.',
		description: '1 hour ago'
	},
	{
		title: 'You have a new message!',
		description: '1 hour ago'
	},
	{
		title: 'Your subscription is expiring soon!',
		description: '2 hours ago'
	}
]

export default function Home() {
	return (
		<main class='text-center mx-auto text-gray-700 p-10 flex-1'>
			<h1 class='max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>Hello world!</h1>
			<Counter />
			<p class='my-4'>
				<span>Home</span>
				{' - '}
				<A href='/about' class='text-sky-600 hover:underline'>
					About Page
				</A>{' '}
			</p>

			<div class='flex items-start space-x-4'>
				{/* Card and Switch test */}
				<Card class='w-[380px]'>
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>You have 3 unread messages.</CardDescription>
					</CardHeader>
					<CardContent class='grid gap-4'>
						<div class='flex items-center space-x-4 rounded-md border p-4'>
							<div class='flex-1 space-y-1'>
								<p class='text-sm font-medium leading-none'>Push Notifications</p>
								<p class='text-sm text-muted-foreground'>Send notifications to device.</p>
							</div>
							<Switch>
								<SwitchControl>
									<SwitchThumb />
								</SwitchControl>
							</Switch>
						</div>
						<div>
							{/* Display notifications using the "For" loop */}
							<For each={notifications}>
								{(notification) => (
									<div class='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
										<span class='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 relative z-1' />
										<div class='space-y-1'>
											<p class='text-sm font-medium leading-none'>{notification.title}</p>
											<p class='text-sm text-muted-foreground'>{notification.description}</p>
										</div>
									</div>
								)}
							</For>
						</div>
					</CardContent>
					<CardFooter>
						<Button class='w-full'>Mark all as read</Button>
					</CardFooter>
				</Card>

				{/* Checkbox Test */}
				<div class='flex space-x-2'>
					<Checkbox id='terms1' />
					<div class='grid gap-1.5 leading-none'>
						<p class='text-sm text-muted-foreground'>Hiiiiiiiii</p>
					</div>

					{/* Popover Test */}
					<Popover>
						<PopoverTrigger as={Button<'button'>}>Notice me senpai</PopoverTrigger>
						<PopoverContent>:3</PopoverContent>
					</Popover>

					{/* Select Test */}
					<Select
						value={value()}
						onChange={setValue}
						options={['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']}
						placeholder='Select a fruit…'
						itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
					>
						<SelectTrigger aria-label='Fruit' class='w-[180px]'>
							<SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>
				</div>
			</div>
		</main>
	)
}
