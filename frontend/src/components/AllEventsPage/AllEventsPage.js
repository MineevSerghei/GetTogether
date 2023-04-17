import EventItem from "./EventItem";
import { useEffect } from 'react';
import { getEventsThunk } from "../../store/events";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllEventsPage.css';


export default function AllEventsPage() {

    const dispatch = useDispatch();

    const events = useSelector((state) => state.events.allEvents);

    const eventsArr = Object.values(events);

    const sortedEvents = eventsArr.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    useEffect(() => {

        dispatch(getEventsThunk());

    }, [dispatch])

    return (
        sortedEvents.length > 0 && <div className="groups-page-container">
            <div className="groups-container">
                <div className="show-all-head">
                    <div className="show-all-header-links">
                        <h2 className="show-all-link-inactive">Events</h2>
                        <Link className="show-all-link-active" to='/groups'><h2>Groups</h2></Link>
                    </div>
                    <p>Events in <span className="get-together-span">GetTogether</span></p>
                </div>
                {sortedEvents.map(e => (<EventItem key={e.id} event={e} />))}
            </div>
        </div>
    )

}
