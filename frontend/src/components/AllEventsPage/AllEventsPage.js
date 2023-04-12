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

    useEffect(() => {

        dispatch(getEventsThunk());

    }, [dispatch])

    return (
        <div>
            <div>
                <h5>Events</h5>
                <Link to='/groups'><h5>Groups</h5></Link>
            </div>
            <div className="events-container">
                {eventsArr.map(e => (<EventItem key={e.id} event={e} />))}
            </div>
        </div>
    )

}
