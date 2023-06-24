import EventItem from "./EventItem";
import { useEffect, useState } from 'react';
import { getEventsThunk } from "../../store/events";
import { searchEventsThunk } from "../../store/events";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllEventsPage.css';


export default function AllEventsPage({ searchTerm, setSearchTerm }) {

    const dispatch = useDispatch();

    const events = useSelector((state) => state.events.allEvents);

    const eventsArr = Object.values(events);

    const pastUnsorted = [];
    const futureUnsorted = [];

    for (let event of eventsArr) {
        if ((new Date(event.startDate).getTime()) < Date.now()) {
            pastUnsorted.push(event);
        } else {
            futureUnsorted.push(event);
        }
    }

    const past = pastUnsorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const future = futureUnsorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    useEffect(() => {

        const findEvents = async () => {

            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('q');
            const params = {};

            if (name) {
                params.name = name;
                setSearchTerm(name);
            } else {
                setSearchTerm('');
            }

            await dispatch(searchEventsThunk(params));
        }

        findEvents();

    }, [dispatch])

    return (
        <div className="groups-page-container">
            <div className="groups-container">
                <div className="show-all-head">
                    <div className="show-all-header-links">
                        <h2 className="show-all-link-inactive">Events</h2>
                        <Link className="show-all-link-active" to='/groups'><h2>Groups</h2></Link>
                    </div>
                    {searchTerm ? <p>Search results for: <span className="get-together-span">{searchTerm}</span></p>
                        : <p>All Events in <span className="get-together-span">GetTogether</span></p>}
                </div>
                <div className="event-group-items">
                    {past.length <= 0 && future.length <= 0 ? <h4>No results found :(</h4> :
                        <>
                            {future.map(e => (<EventItem key={e.id} event={e} />))}
                            {past.length > 0 && <h2>Past Events</h2>}
                            {past.map(e => (<EventItem key={e.id} event={e} />))}
                        </>
                    }
                </div>
            </div>
        </div>
    )

}
