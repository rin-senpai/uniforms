import { A } from '@solidjs/router'
import Counter from '~/components/Counter'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Switch, SwitchControl, SwitchThumb } from '~/components/ui/switch'
import { createSignal, For, splitProps } from 'solid-js'
import { Checkbox } from '~/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import QRCodeButton from '~/components/QRCodeButton'
import { boulderingURI } from '~/components/URItest'
import { Event } from '../../../server/src/interface'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import EventsView from '~/components/EventsView'
import { eventsListDefault } from '~/components/eventsTest'
import SocietyView from '~/components/SocietyView'

// Notifications data
const notifications = [
	{ title: 'Event | AUNSW x BESS x BoulderSoc Bouldering Event! 🧗‍♂️😱', description: 'Join AUNSW, BESS, and BoulderSoc for an exciting evening of bouldering at Nomad in Annandale!' },
	{ title: 'Society | AUNSW has 3 newly added Events!!!! 😱', description: 'Check out all the new Events' }
]

export default function Home(props: any) {
	const [value, setValue] = createSignal('')
	const selectedEvent = eventsListDefault[1]

	return (
		<main class='text-center mx-auto text-gray-700 p-10 flex-1 overflow-x-hidden'>
			<h1 class='max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>Hello world!</h1>

			{/* Notifications Section */}
			<Card class='w-full max-w-[1100px] mx-auto'>
				<CardHeader>
					<CardTitle class='text-3xl font-bold'>Notifications</CardTitle>
				</CardHeader>
				<For each={notifications}>
					{(notification, index) => (
						<CardContent key={index()}>
							<div class='flex items-center justify-center space-x-4 rounded-md border p-4'>
								<span class='flex size-2 translate-y-1 rounded-full bg-sky-500 mb-2' />
								<div class='flex flex-col space-y-1 text-center'>
									<p class='text-sm font-semibold leading-none'>{notification.title}</p>
									<p class='text-sm text-muted-foreground'>{notification.description}</p>
								</div>
							</div>
						</CardContent>
					)}
				</For>
				<CardFooter class='flex justify-center mt-2'>
					<Button class='font-semibold text-sm flex w-[300px]'>Mark all as read</Button>
				</CardFooter>
			</Card>

			{/* Managed Socs Section */}
			<div class='flex items-start space-x-4 gap-28 mt-4 max-w-[1100px] mx-auto'>
				<div class='flex flex-col items-center'>
					<h2 class='text-xl font-bold'>Managed Socs</h2>
					<div class='flex flex-col max-w-md w-[250px] grid-cols-3 gap-6 mt-4 text-3xl'>
						<Button class='w-full h-10'>DevSoc</Button>
						<Button class='w-full'>CSESoc</Button>
						<Button class='w-full'>Bouldering Soc</Button>
					</div>
				</div>

				<div class='flex flex-col justify-start'>
					<h2 class='text-xl font-bold text-left'>Upcoming Events</h2>
					<EventsView class='w-[1200px] gap-10 mx-0' events={eventsListDefault} numberOfEvents={3} />
				</div>
			</div>

			{/* Single Event Section */}
			<div class='flex flex-col items-start mt-10 max-w-[1100px] mx-auto'>
				<h2 class='text-3xl font-bold mb-4'>Spotlight Event</h2>
				<Card class='flex flex-row w-full p-6 border-pink-400'>
					<img src={selectedEvent.bannerURI} alt={selectedEvent.title} class='rounded-lg mb-4 w-1/3 h-64 object-cover' />
					<div class='w-2/3 ml-6'>
						<CardHeader>
							<CardTitle class='text-2xl font-bold'>{selectedEvent.title}</CardTitle>
						</CardHeader>
						<CardContent class='text-left mt-2'>
							<p class='text-md text-gray-600'>{selectedEvent.description}</p>
							<p class='text-sm text-gray-500 mt-2'>
								<strong>Date:</strong> {new Date(selectedEvent.timeStart).toLocaleString()} - {new Date(selectedEvent.timeEnd).toLocaleString()}
							</p>
							<p class='text-sm text-gray-500'>
								<strong>Location:</strong> {selectedEvent.location}
							</p>
						</CardContent>
					</div>
				</Card>
			</div>
		</main>
	)
}
