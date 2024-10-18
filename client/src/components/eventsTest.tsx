import { Event } from '../../../server/src/interface'
import { boulderingURI, skullimgURI } from './URItest'

export const eventsListDefault: Event[] = [
	{
		id: 0,
		organisationId: 0,
		title: 'title',
		description: 'description',
		isPublic: true,
		timeStart: new Date(1728885600 * 1000),
		timeEnd: new Date(1728892800 * 1000),
		location: 'somewhere',
		bannerURI: skullimgURI,
		createdAt: new Date()
	},
	{
		id: 1,
		organisationId: 0,
		title: 'title2',
		description: 'description2',
		isPublic: true,
		timeStart: new Date(1728885600 * 1000),
		timeEnd: new Date(1728892800 * 1000),
		location: 'somewhere2',
		bannerURI: skullimgURI,
		createdAt: new Date()
	},
	{
		id: 2,
		organisationId: 0,
		title: 'AUNSW x BESS x BoulderSoc Bouldering Event! 🧗‍♂️😱',
		description:
			"Join AUNSW, BESS, and BoulderSoc for an exciting evening of bouldering at Nomad in Annandale! Whether you're a climbing pro or a complete beginner, this is the perfect chance to have fun and meet new people. 🎉🤗",
		isPublic: true,
		timeStart: new Date(1728885600 * 1000),
		timeEnd: new Date(1728892800 * 1000),
		location: 'Bouldering Place',
		bannerURI: boulderingURI,
		createdAt: new Date()
	},
	{
		id: 3,
		organisationId: 0,
		title: 'title4',
		description: 'description4',
		isPublic: true,
		timeStart: new Date(1728885600 * 1000),
		timeEnd: new Date(1728892800 * 1000),
		location: 'somewhere4',
		bannerURI: '',
		createdAt: new Date()
	},
	{
		id: 4,
		organisationId: 1,
		title: 'title5',
		description: 'description5',
		isPublic: true,
		timeStart: new Date(1728885600 * 1000),
		timeEnd: new Date(1728892800 * 1000),
		location: 'somewhere5',
		bannerURI: '',
		createdAt: new Date()
	}
]
