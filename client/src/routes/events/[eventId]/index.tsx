import SocietyView from '~/components/SocietyView'
import { boulderingURI, skullimgURI } from '~/components/URItest'
import { createQuery, dataTagSymbol, QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { createEffect, createSignal, onMount, Show, Suspense } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import { showToast, Toaster } from '~/components/ui/toast'
import Clock from 'lucide-solid/icons/clock'
import Map from 'lucide-solid/icons/map'
import { createStore } from 'solid-js/store'

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

const queryClient = new QueryClient()

export default function IndividualOrgs() {
	return (
		<QueryClientProvider client={queryClient}>
			<IndividualOrgsQuery />
			<SolidQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}


function IndividualOrgsQuery() {
	const navigate = useNavigate()
	const params = useParams()

	const [isEdited, setIsEdited] = createSignal(false);

	// Check local storage on mount to set the initial state
	// onMount(() => {
	// 	const savedVisibility = localStorage.getItem('organisationEdited');
	// 	if (savedVisibility === 'true') {
	// 		showToast({title: "Wahoo!", description: "Successfully edited the society", variant: 'success'})
	// 		setIsEdited(false);
	// 		localStorage.setItem('organisationEdited', JSON.stringify(isEdited()));
	// 	}
	// });

	const eventQuery = createQuery(() => ({
		queryKey: ['data'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/events/${params.eventId}`, {
				method: 'GET'
			})

			if (!response.ok) {
                navigate('/events/new')
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()

			return {
				title: body.event.title,
				organisationId: body.event.organisationId,
				description: body.event.description,
				isPublic: body.event.isPublic,
				timeStart: body.event.timeStart * 1000, // SECONDS
				timeEnd: body.event.timeEnd * 1000,
				location: body.event.location,
				bannerURI: body.event.bannerURI
			}
		}
	}))

	const orgQuery = createQuery(() => ({
		queryKey: ['org'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/orgs/${await eventQuery.data?.organisationId}`, {
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
		enabled: eventQuery.isSuccess
	}))

    const [dateStore, setDateStore] = createStore({
        timeStart: eventQuery.data?.timeStart,
        timeEnd: eventQuery.data?.timeEnd,
    })

    createEffect(() => {
		const isAllSuccess = eventQuery.isSuccess
		const isAnyLoading = eventQuery.isLoading 
		if (isAllSuccess) {
			setDateStore({ timeStart: eventQuery.data.timeStart, timeEnd: eventQuery.data.timeEnd })
		}
	})

    console.log(eventQuery.data?.timeStart)

	return (
		<Suspense fallback={'Loading...'}>
			<div class='w-full m-5 flex flex-col gap-4'>
				<div class='*:rounded-xl relative'>
					<img class='object-contain w-full h-auto' src={eventQuery.data?.bannerURI} />
					<div class='object-contain absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30'></div>
					<h2 class='absolute inset-x-5 bottom-5 text-white text-sm lg:text-6xl'>{eventQuery.data?.title}</h2>
				</div>

                <div class='w-full flex flex-col gap-2'>
                    <div class='flex flex-row gap-4'>
                        <div class='flex flex-row gap-1'>
                            <Clock />
                            <p>
                                Start: {new Date(dateStore.timeStart).toString().slice(0, -34)}
                            </p>
                        </div>

                        <div class='flex flex-row gap-1'>
                            <Clock />
                            <p>
                                End: {new Date(dateStore.timeEnd).toString().slice(0, -34)}
                            </p>
                        </div>

                        <div class='flex flex-row gap-1'>
                            <Map />
                            <p>
                                Location: {eventQuery.data?.location}
                            </p>
                        </div>
                        
                    </div>
                    <div class='w-full flex flex-row gap-4'>
                        <p class='w-3/4'>{eventQuery.data?.description}</p>
                        <div class='flex flex-col gap-4 w-1/4'>
                            <Button class='w-full' as='a' href={`/events/${params.eventId}/edit`}>Edit this event</Button>
                        </div>
                    </div>
                </div>
                   
			</div>
			<Toaster/>
		</Suspense>
	)
}
