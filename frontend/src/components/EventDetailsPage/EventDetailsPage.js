import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getEventThunk } from '../../store/events';
import OpenModalButton from '../OpenModalButton';
import DeleteGroupModal from '../DeleteGroupModal';
import './EventDetailsPage.css';


export default function EventDetailsPage() {

    const [image, setImage] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    const { eventId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const event = useSelector(state => state.events.singleEvent);


    const start = getTime(event.startDate);
    const end = getTime(event.endDate);

    useEffect(() => {
        const getEvent = async () => {
            const res = await dispatch(getEventThunk(eventId));
            if (res instanceof Response && res.status === 404) history.push('/404')
        }
        getEvent();

    }, [dispatch])

    const changeImg = () => {
        setImage((image + 1) % event.EventImages.length)
    }
    // console.log('-------------------')
    // console.log(event)
    // console.log(event.Group.Organizer)
    // console.log(event.id, eventId)
    // console.log('-------------------')

    if (!event || !event.Group.Organizer || +event.id !== +eventId || !event.Group.GroupImages) return null;

    return (
        <div className='details-page-events'>
            <div className='details-page-header-wrapper'>
                <div className='details-page-events-header'>
                    <Link to='/events'> {"<- Events"}</Link>
                    <h2>{event.name}</h2>
                    <p className='no-top-margin'>Hosted by: {event.Group.Organizer.firstName + ' ' + event.Group.Organizer.lastName}</p>
                </div>
            </div>
            <div className='details-page-gray-wrapper'>
                <div className='events-event-container'>
                    <div className='event-image-info-container'>
                        <div className='event-img-wrapper'>
                            <img
                                src={event.EventImages.length > 0 ? event.EventImages[image].url : ""}
                                onClick={changeImg}
                                className='event-details-img'
                            ></img>
                        </div>
                        <div className='event-info-group-container'>
                            <div className='mini-group-container'>
                                <div >
                                    <img
                                        src={event.Group.GroupImages.length > 0 ? event.Group.GroupImages[0].url : ''}
                                        className='mini-group-img'
                                    ></img>
                                </div>
                                <div>
                                    <h3><Link className='black-link' to={`/groups/${event.Group.id}`}>{event.Group.name}</Link></h3>
                                    <p>{event.private ? "Private" : "Public"}</p>
                                </div>
                            </div>
                            <div className='event-info-container'>
                                <div className='event-time-div' title={start.zone}>
                                    <i className="fa-regular fa-clock"></i>
                                    <div className='event-time-wrapper'>
                                        <p className='event-time'>START </p>
                                        <p className='event-time'>END </p>
                                    </div>
                                    <div>
                                        <p className='event-time teal'> {start.date + ' · ' + start.time}</p>
                                        <p className='event-time teal'> {end.date + ' · ' + end.time}</p>
                                    </div>
                                </div>
                                <div className='event-time-div'>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <p className='event-time'>{event.price <= 0 ? 'FREE' : `$${event.price}`}</p>
                                </div>
                                <div className='event-time-div'>
                                    <i className="fa-solid fa-map-pin"></i>
                                    <p className='event-time'>{event.type}</p>
                                    {sessionUser && event.Group.Organizer.id === sessionUser.id &&
                                        <>
                                            <button onClick={() => alert('Feature coming soon')} className='manage-bttn bttn-right update-bttn'>Update</button>
                                            <OpenModalButton
                                                buttonText="Delete"
                                                className='manage-bttn bttn-right'
                                                modalComponent={<DeleteGroupModal eventId={event.id} groupId={event.Group.id} target='event' />} /> </>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='event-details-container'>
                        <h2>Details</h2>
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function getTime(timeDate) {
    const dateObj = new Date(timeDate);
    const timeZone = dateObj.toTimeString();

    const year = dateObj.getFullYear();
    const monthInteger = dateObj.getMonth() + 1;
    const dayInteger = dateObj.getDate();
    const month = String(monthInteger).length === 1 ? `0${monthInteger}` : `${monthInteger}`;
    const day = String(dayInteger).length === 1 ? `0${dayInteger}` : `${dayInteger}`;

    const militaryHours = dateObj.getHours();
    const minutesInteger = dateObj.getMinutes();
    const minutes = String(minutesInteger).length === 1
        ? `0${minutesInteger}` : String(minutesInteger).length === 0
            ? `00` : `${minutesInteger}`;

    const suffix = militaryHours >= 12 ? 'PM' : 'AM';
    const hours = ((militaryHours + 11) % 12 + 1);

    const zone = timeZone.slice(9);

    return {
        time: `${hours}:${minutes} ${suffix}`,
        date: `${year}-${month}-${day}`,
        zone
    };
}
