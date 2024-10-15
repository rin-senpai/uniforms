import { For } from "solid-js";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { skullimgURI } from "./URItest"
import EventsView from "./EventsView";
import { eventsListDefault } from "./eventsTest";

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

export default function SocietyView(props: object) {
    return (
    <div class='flex flex-col p-4'>
        <For each={societies}>{(item) => (
            <Card class="m-2">

                <CardContent class="grid grid-cols-2">
                    <div class='place-self-center'>
                        <img class="h-60 rounded-lg" src={item.imageUrl}/>
                        
                        <CardTitle>{item.name}</CardTitle>
                    </div>
                    <EventsView events={eventsListDefault} numberOfEvents={3} displayDescription={false}/>
                </CardContent>

            </Card>
        )}
        </For>
    </div>
    );
}