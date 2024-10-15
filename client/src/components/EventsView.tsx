import { boulderingURI, skullimgURI } from "./URItest"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { For, ValidComponent } from "solid-js";
import { createQuery } from '@tanstack/solid-query'
import { Event } from '../../../server/src/interface'

// type EventsViewProps<T extends ValidComponent = 'div'> = {
// 	displaySociety?: boolean
// 	societyId?: number, // Filters events based on society. If none is provided
// 	displaySpotlight?: boolean
// 	numberOfEvents?: number // Puts a limit on the number of events you want to display
// 	tags?: string | undefined,
// }

type EventsViewProps<T extends ValidComponent = 'div'> = {
	events?: Event[] | []
}

const createEventQuery = (url: string) => {
	const events = createQuery(() => ({
		queryKey: [`${url}`],
		queryFn: async () => {
		  const response = await fetch(`${url}`)
		  if (!response.ok) {
			throw new Error(`Failed to fetch ${url}`)
		  }
		  return response.json()
		},
	  }))
	return events;
}

const retrieveEvents = (props: EventsViewProps) => {
	const displaySociety = () => ('displaySociety' in props ? props.displaySociety : false)
	const displaySpotlight = () => ('displaySpotlight' in props ? props.displaySpotlight : false)
	
	let url: string;
	if (displaySpotlight()) {
		url = `/event/spotlight`
		return createEventQuery(url);
	}

	if (displaySociety()) {
		const societyId = () => ('societyId' in props ? props.societyId : -1)
		url = `/orgs/${societyId()}/events`
		return createEventQuery(url);
	}

	url = `/events`
	return createEventQuery(url);
}

export default function EventsView(props: EventsViewProps) {
	// Get a list of events

	const eventsList = () => ('events' in props ? props.events : [])

	const dateFormat = (unixTimestamp: number) => {
		const date = new Date(unixTimestamp * 1000)
		return date.getDate().toString() + ' of ' + date.toLocaleString('default', { month: 'long' })
	}

	const dateFormatHour = (unixStart: number, unixEnd: number) => {
		const dateStart = new Date(unixStart * 1000)
		const dateEnd = new Date(unixEnd * 1000)
		return dateStart.getHours().toString() + '-' + dateEnd.getHours().toString()
	}


	return (
		<div>
			<h1>UPCOMING EVENTS</h1>
			<div class="grid grid-cols-3 gap-4 m-4">
				<For each={eventsList()}>{(item) => (
					<Card class="p-4">
						<CardTitle class="p-3">
							{item.title}
						</CardTitle>
						<CardContent>
							<img class="rounded-lg" src={item.bannerURI}/>
						</CardContent>
						<CardDescription>
							{item.description}
							<br/>
							<p class="font-bold">Location: {item.location}</p>
							<p class="font-bold">Time: {dateFormat(item.timeStart)} {dateFormatHour(item.timeStart, item.timeEnd)}</p>
						</CardDescription>
					</Card>
				)}
				</For>
			</div>
		</div>
	)
}
