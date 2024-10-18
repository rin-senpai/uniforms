import { eventsListDefault } from '~/components/eventsTest'
import { Event } from '../../../../server/src/interface'
import EventsView from '~/components/EventsView'
import { TextField, TextFieldInput } from '~/components/ui/text-field'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { createSignal } from 'solid-js'
import { createQuery, QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

const queryClient = new QueryClient()

export default function Edit() {
	return (
		<QueryClientProvider client={queryClient}>
			<Events />
			<SolidQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

function Events() {
    const eventQuery = createQuery(() => ({
		queryKey: ['data'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/events`, {
				method: 'GET'
			})

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()
            const eventsList: Event[] = body.events;

			return eventsList;
		}
	}))

	const [searchItem, setSearchItem] = createSignal('')
	const filteredEvents = () => {
		if (searchItem() !== '') {
			return eventQuery.data?.filter((event) => event.title.toLowerCase().includes(searchItem().toLowerCase()))
		} else {
			return eventQuery.data
		}
	}

	return (
		<div class='w-full m-5'>
			<h1 class='text-center max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>Events</h1>
			<div class='flex flex-row'>
				<TextField class='flex-1 p-3'>
					<TextFieldInput type='search' placeholder='Search Events' onInput={(e) => setSearchItem(e.currentTarget.value)}>
						Search
					</TextFieldInput>
				</TextField>
				<DropdownMenu>
					<DropdownMenuTrigger as={Button<'button'>} class='m-3 p-3 rounded-lg'>
						Filter by
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Event Name</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Society</DropdownMenuItem>
						<DropdownMenuItem>Location</DropdownMenuItem>
						<DropdownMenuItem>Time</DropdownMenuItem>
						<DropdownMenuItem>Description</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<EventsView class='text-center' events={filteredEvents()}/>
		</div>
	)
}
