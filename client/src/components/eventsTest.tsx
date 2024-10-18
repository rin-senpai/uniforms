import { Event } from '../../../server/src/interface'
import { boulderingURI, devsocTechspire, hackathon, raoliSoc, skullimgURI } from './URItest'

export const eventsListDefault: Event[] = [
	{
		id: 1,
		organisationId: 0,
		title: 'Transport Heritage Weekend',
		description: 'Once again, the Transport Heritage Weekend is upon us! As one of the biggest railway events of the year, we\'re going to be running a couple of meetups and events where you\'ll get to ride trains, take photos of trains and enjoy, well, trains :D',
		isPublic: true,
		timeStart: 1728095400,
		timeEnd: 1728183600,
		location: 'Central Grand Concourse',
		bannerURI: raoliSoc,
		createdAt: new Date()
	},
	{
		id: 2,
		organisationId: 0,
		title: 'Blueprint Hackathon',
		description: 'Get ready to code, design, and develop! From 11 October to 19 October, we’re hosting a hackathon (theme to be disclosed on day). Surprise yourself with what you can make in a week!',
		isPublic: true,
		timeStart: 1728630000,
		timeEnd: 1729299600,
		location: 'Online',
		bannerURI: hackathon,
		createdAt: new Date()
	},
	{
		id: 3,
		organisationId: 0,
		title: 'AUNSW x BESS x BoulderSoc Bouldering Event',
		description:
			"Join AUNSW, BESS, and BoulderSoc for an exciting evening of bouldering at Nomad in Annandale! Whether you're a climbing pro or a complete beginner, this is the perfect chance to have fun and meet new people. 🎉🤗",
		isPublic: true,
		timeStart: 1729663200,
		timeEnd: 1728892800,
		location: 'Nomad',
		bannerURI: boulderingURI,
		createdAt: new Date()
	},
	{
		id: 4,
		organisationId: 0,
		title: 'DevSoc TechSpire Industry Conference',
		description:
			"Join DevSoc as we host an invaluable industry talk with speakers from your favourite tech companies.",
		isPublic: true,
		timeStart: 1730779200,
		timeEnd: 1730790000,
		location: 'UNSW Roundhouse',
		bannerURI: devsocTechspire,
		createdAt: new Date()
	},
	{
		id: 5,
		organisationId: 0,
		title: 'title4',
		description: 'description4',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		location: 'somewhere4',
		bannerURI: '',
		createdAt: new Date()
	},
	{
		id: 6,
		organisationId: 1,
		title: 'title5',
		description: 'description5',
		isPublic: true,
		timeStart: 1728885600,
		timeEnd: 1728892800,
		location: 'somewhere5',
		bannerURI: '',
		createdAt: new Date()
	}
]
