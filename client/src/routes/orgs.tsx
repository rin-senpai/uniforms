import SocietyView from '~/components/SocietyView'
import { boulderingURI, skullimgURI } from '../components/URItest'

interface Society {
	name: string
	imageUrl: string
}

const societies: Society[] = [
	{
		name: 'AnimeUNSW',
		imageUrl: boulderingURI
	},
	{
		name: 'CSESoc',
		imageUrl: skullimgURI
	},
	{
		name: 'DevSoc',
		imageUrl: skullimgURI
	}
]

export default function Orgs() {
	return (
		<div class='w-full m-5'>
			<h1 class='text-center max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>Organisations</h1>
			<SocietyView orgs={societies} />
		</div>
	)
}
