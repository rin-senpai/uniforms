import { boulderingURI, skullimgURI } from "./URItest"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"

export default function EventsCard() {
	// Get a list of events
	const events = [
		{
			id: 0,
			organisationId: 0,
			title: 'title',
			description: 'description',
			isPublic: true,
			timeStart: 1728885600,
			timeEnd: 1728892800,
			location: 'somewhere',
			bannerURI: skullimgURI,
			createdAt: ''
		},
		{
			id: 1,
			organisationId: 0,
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
			id: 2,
			organisationId: 0,
			title: 'AUNSW x BESS x BoulderSoc Bouldering Event! 🧗‍♂️😱',
			description: 'Join AUNSW, BESS, and BoulderSoc for an exciting evening of bouldering at Nomad in Annandale! Whether you\'re a climbing pro or a complete beginner, this is the perfect chance to have fun and meet new people. 🎉🤗',
			isPublic: true,
			timeStart: 1728885600,
			timeEnd: 1728892800,
			location: 'Bouldering Place',
			bannerURI: boulderingURI,
			createdAt: ''
		},
		{
			id: 3,
			organisationId: 0,
			title: 'title4',
			description: 'description4',
			isPublic: true,
			timeStart: 1728885600,
			timeEnd: 1728892800,
			location: 'somewhere4',
			bannerURI: '',
			createdAt: ''
		},
		{
			id: 4,
			organisationId: 0,
			title: 'title5',
			description: 'description5',
			isPublic: true,
			timeStart: 1728885600,
			timeEnd: 1728892800,
			location: 'somewhere5',
			bannerURI: '',
			createdAt: ''
		}
	]

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
				{events.map(e =>
					<Card class="p-4">
						<CardTitle class="p-3">
							{e.title}
						</CardTitle>
						<CardContent>
							<img class="rounded-lg" src={e.bannerURI}/>
						</CardContent>
						<CardDescription>
							{e.description}
							<br/>
							<p class="font-bold">Location: {e.location}</p>
							<p class="font-bold">Time: {dateFormat(e.timeStart)} {dateFormatHour(e.timeStart, e.timeEnd)}</p>
						</CardDescription>
					</Card>
				)}
			</div>
		</div>
	)
}
