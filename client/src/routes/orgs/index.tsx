import SocietyView from '~/components/SocietyView'
import { boulderingURI, skullimgURI } from '../../components/URItest'
import { Organisation } from '../../../../server/src/interface'
import { createQuery, QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const societies: Organisation[] = [
	{
		id: 1,
		name: 'AnimeUNSW',
		description: 'anime is real',
		avatarURI: boulderingURI,
		bannerURI: null,
		createdAt: new Date()
	},
	{
		id: 2,
		name: 'CSESoc',
		description: 'computer science rules!!!!!!!!!1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1',
		avatarURI: skullimgURI,
		bannerURI: null,
		createdAt: new Date()
	},
	{
		id: 3,
		name: 'DevSoc',
		description: 'i love coding so much ahshdjadalsdjaksdkjs',
		avatarURI: skullimgURI,
		bannerURI: null,
		createdAt: new Date()
	}
]

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

const queryClient = new QueryClient()

export default function Edit() {
	return (
		<QueryClientProvider client={queryClient}>
			<Orgs />
		</QueryClientProvider>
	)
}

function Orgs() {
	const orgsQuery = createQuery(() => ({
		queryKey: ['data'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/orgs`, {
				method: 'GET'
			})

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()
            const orgsList: Organisation[] = body.organisations;

			return orgsList;
		}
	}))

	return (
		<div class='w-full m-5'>
			<h1 class='text-center max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>Organisations</h1>
			<SocietyView orgs={orgsQuery.data} />
		</div>
	)
}
