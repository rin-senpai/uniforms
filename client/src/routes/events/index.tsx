import { eventsListDefault } from '~/components/eventsTest'
import EventsView from '~/components/EventsView'
import { TextField, TextFieldInput } from '~/components/ui/text-field'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { createSignal } from 'solid-js'

export default function Events() {
	const [searchItem, setSearchItem] = createSignal('')
	const filteredEvents = () => {
		if (searchItem() !== '') {
			return eventsListDefault.filter((event) => event.title.toLowerCase().includes(searchItem().toLowerCase()))
		} else {
			return eventsListDefault
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

			<EventsView class='text-center' events={filteredEvents()} />
		</div>
	)
}
