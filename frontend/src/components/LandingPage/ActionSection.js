import ActionItem from "./ActionItem";
import { useSelector } from 'react-redux';

export default function ActionSection() {

    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="actions-container">
            <ActionItem
                link={{ text: 'See all groups', url: "/groups" }}
                heading="See all groups"
                description="Browse through the groups on Get Together and see which ones you'd join!" />
            <ActionItem
                link={{ text: 'Find an event', url: "/events" }}
                heading="Find an event"
                description="Look through what kind of events groups are hosting! Request an attendance and join in on the fun!" />
            <ActionItem
                link={{ text: 'Start a new group', url: "/groups/create" }}
                heading="Start a new group"
                description="Create a new community of people with the same interest around you!"
                sessionUser={sessionUser} />
        </div>
    )
}
