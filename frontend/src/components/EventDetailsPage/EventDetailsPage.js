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
                    <p>Hosted by {event.Group.Organizer.firstName + ' ' + event.Group.Organizer.lastName}</p>
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
                                    <h3>{event.Group.name}</h3>
                                    <p>{event.private ? "Private" : "Public"}</p>
                                </div>
                            </div>
                            <div className='event-info-container'>
                                <div title={start.zone}>
                                    <i className="fa-regular fa-clock"></i>
                                    <p>START {start.date + ' · ' + start.time}</p>
                                    <p>END {end.date + ' · ' + end.time}</p>
                                </div>
                                <div>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <p>{event.price <= 0 ? 'FREE' : `$${event.price}`}</p>
                                </div>
                                <div>
                                    <i className="fa-solid fa-map-pin"></i>
                                    <p>{event.type}</p>
                                    {sessionUser && event.Group.Organizer.id === sessionUser.id &&
                                        <OpenModalButton
                                            buttonText="delete"
                                            modalComponent={<DeleteGroupModal eventId={event.id} groupId={event.Group.id} target='event' />} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
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
    const time = timeZone.slice(0, 8);
    const zone = timeZone.slice(9);
    const date = dateObj.toDateString();
    return { time, date, zone };
}
