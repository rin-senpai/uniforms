import { For } from "solid-js";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { boulderingURI, skullimgURI } from "./URItest"
import EventsCard from "./EventsView";

interface SocietyViewProps {

}

interface Society {
    name: string,
    imageUrl: string
}

const societies: Society[] = [
    {
        name: 'AnimeUNSW',
        imageUrl: skullimgURI
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

export default function SocietyView(props: object) {
    return (
    <div class='flex flex-col p-4'>
        <For each={societies}>{(item) => (
            <Card class="m-2">
                <CardTitle>
                    <img class="rounded-lg" src={item.imageUrl}/>
                </CardTitle>

                <CardContent>
                    {/* <For each={events.slice(0, 3)}>{(item) => (
                        <EventsCard/>
                    )}
                    </For> */}
                </CardContent>

            </Card>
        )}
        </For>
    </div>
    );
}