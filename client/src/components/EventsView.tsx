import { boulderingURI, skullimgURI } from "./URItest"
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "./ui/card"
import { For, ValidComponent, splitProps, Show } from "solid-js";
import { Event } from '../../../server/src/interface'
import { cn } from "~/lib/utils";
import Clock from 'lucide-solid/icons/clock'
import Map from "lucide-solid/icons/map";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card"
import { Button } from "./ui/button";

// type EventsViewProps<T extends ValidComponent = 'div'> = {
// 	displaySociety?: boolean
// 	societyId?: number, // Filters events based on society. If none is provided
// 	displaySpotlight?: boolean
// 	numberOfEvents?: number // Puts a limit on the number of events you want to display
// 	tags?: string | undefined,
// }

type EventsViewProps<T extends ValidComponent = 'div'> = {
	events: Event[] | []
	numberOfEvents?: number
}

export default function EventsView(props: any) {
	// Get a list of events

	const numberOfEvents = () => ('numberOfEvents' in props ? props.numberOfEvents : -1)

	let eventsList;
	if (numberOfEvents() != -1) {
		eventsList = () => (('events' in props) ? props.events.slice(0, numberOfEvents()) : [])
	} else {
		eventsList = () => (('events' in props) ? props.events : [])
	}

	const description = () => ('displayDescription' in props ? props.displayDescription : true)

	const compact = () => ('compact' in props ? props.compact : false)

	const dateFormat = (unixTimestamp: number) => {
		const date = new Date(unixTimestamp * 1000)
		return date.getDate().toString() + ' ' + date.toLocaleString('default', { month: 'long' })
	}

	const dateFormatHour = (unixStart: number, unixEnd: number) => {
		const dateStart = new Date(unixStart * 1000)
		const dateEnd = new Date(unixEnd * 1000)
		return dateStart.getHours().toString() + '-' + dateEnd.getHours().toString()
	}

	const [local, others] = splitProps(props, ['class'])
	return (
		<div class={cn("grid grid-cols-5 gap-4 m-4", local.class)} {...others}>
			<For each={eventsList()}>{(item) => (
				<Card class="">
					
					<CardHeader class="relative inset-x-0 top-0 p-0">
						<div class='*:rounded-lg relative'>
							<img class="object-contain" src={item.bannerURI}/>
							<Show when={!compact()}>
								<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
								<CardTitle class="absolute inset-x-0 bottom-5 text-white text-lg">{item.title}</CardTitle>
							</Show>
						</div>
					</CardHeader>

					<Show when={!compact()}>
					<CardDescription class='justify-self-center mx-5 mt-5 flex flex-row flex-wrap gap-4'>
						<div class='flex flex-row gap-2 items-center'>
							<Clock/>
							<p class="font-bold">{dateFormat(item.timeStart)} {dateFormatHour(item.timeStart, item.timeEnd)}</p>
						</div>
						

						<div class='flex flex-row gap-2 items-center'>
							<Map/>
							<p class="font-bold">{item.location}</p>
						</div>
					</CardDescription>

					
					<CardContent class="p-4 px-8">
					<HoverCard>
						<HoverCardTrigger as={Button<"button">} variant="link">See more...</HoverCardTrigger>
						<HoverCardContent>{(description() ? item.description : '')}</HoverCardContent>
					</HoverCard>
					</CardContent>
					</Show>
				</Card>
			)}
			</For>
		</div>
	)
}

// 	

// const createEventQuery = (url: string) => {
// 	const events = createQuery(() => ({
// 		queryKey: [`${url}`],
// 		queryFn: async () => {
// 		  const response = await fetch(`${url}`)
// 		  if (!response.ok) {
// 			throw new Error(`Failed to fetch ${url}`)
// 		  }
// 		  return response.json()
// 		},
// 	  }))
// 	return events;
// }

// const retrieveEvents = (props: EventsViewProps) => {
// 	const displaySociety = () => ('displaySociety' in props ? props.displaySociety : false)
// 	const displaySpotlight = () => ('displaySpotlight' in props ? props.displaySpotlight : false)
	
// 	let url: string;
// 	if (displaySpotlight()) {
// 		url = `/event/spotlight`
// 		return createEventQuery(url);
// 	}

// 	if (displaySociety()) {
// 		const societyId = () => ('societyId' in props ? props.societyId : -1)
// 		url = `/orgs/${societyId()}/events`
// 		return createEventQuery(url);
// 	}

// 	url = `/events`
// 	return createEventQuery(url);
// }