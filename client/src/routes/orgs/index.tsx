import SocietyView from '~/components/SocietyView'
import { boulderingURI, skullimgURI } from '~/components/URItest'

import { Organisation } from '../../../../server/src/interface'

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

export default function Orgs() {
	return (
		<div class='w-full m-5'>
			<h1 class='text-center max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>Organisations</h1>
			<SocietyView orgs={societies} />
		</div>
	)
}
