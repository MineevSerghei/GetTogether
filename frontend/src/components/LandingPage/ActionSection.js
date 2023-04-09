import ActionItem from "./ActionItem";
import { useSelector } from 'react-redux';

export default function ActionSection() {

    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="actions-container">
            <ActionItem
                link={{ text: 'See all groups', url: "/groups" }}
                heading="See all groups" description="" />
            <ActionItem
                link={{ text: 'Find an event', url: "/events" }}
                heading="Find an event" description="" />
            <ActionItem
                link={{ text: 'Start a new group', url: "/groups/create" }}
                heading="Start a new group" description=""
                sessionUser={sessionUser} />
        </div>
    )
}
