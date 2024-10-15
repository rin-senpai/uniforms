import { Event } from '../../../server/src/interface'
import { boulderingURI, skullimgURI } from "./URItest"

export const eventsListDefault: Event[] = [
	{
		eventId: 0,
		orgId: 0,
		title: 'title',
		description: 'description',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		tags: [],
		location: 'somewhere',
		bannerURI: skullimgURI,
		createdAt: ''
	},
	{
		eventId: 1,
		orgId: 0,
		title: 'title2',
		description: 'description2',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		location: 'somewhere2',
		bannerURI: skullimgURI,
		createdAt: ''
	},
	{
		eventId: 2,
		orgId: 0,
		title: 'AUNSW x BESS x BoulderSoc Bouldering Event! 🧗‍♂️😱',
		description: 'Join AUNSW, BESS, and BoulderSoc for an exciting evening of bouldering at Nomad in Annandale! Whether you\'re a climbing pro or a complete beginner, this is the perfect chance to have fun and meet new people. 🎉🤗',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		location: 'Bouldering Place',
		tags: [],
		bannerURI: boulderingURI,
		createdAt: ''
	},
	{
		eventId: 3,
		orgnId: 0,
		title: 'title4',
		description: 'description4',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		location: 'somewhere4',
		tags: [],
		bannerURI: '',
		createdAt: ''
	},
	{
		eventId: 4,
		orgId: 1,
		title: 'title5',
		description: 'description5',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		location: 'somewhere5',
		tags: [],
		bannerURI: '',
		createdAt: ''
	}
]
