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


    const getTime = (timeDate) => {
        const dateObj = new Date(timeDate);
        const time = dateObj.toTimeString();
        const date = dateObj.toDateString();

        return date + ' · ' + time;
    }

    useEffect(() => {
        dispatch(getEventThunk(eventId));
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
        <div>
            <div>
                <Link to='/events'> {"<- Events"}</Link>
                <h2>{event.name}</h2>
                <p>Hosted by {event.Group.Organizer.firstName + ' ' + event.Group.Organizer.lastName}</p>
            </div>
            <div>
                <div>
                    <img
                        src={event.EventImages.length > 0 ? event.EventImages[image].url : ""}
                        onClick={changeImg}
                        className='event-details-img'
                    ></img>
                </div>
                <div className='mini-group-container'>
                    <div>
                        <img
                            src={event.Group.GroupImages.length > 0 ? event.Group.GroupImages[0].url : ''}
                            className='mini-group-img'
                        ></img>
                    </div>
                    <div>
                        <h4>{event.Group.name}</h4>
                        <p>{event.private ? "Private" : "Public"}</p>
                    </div>
                </div>
                <div className='event-info-container'>
                    <div>
                        <p>START {getTime(event.startDate)}</p>
                        <p>END {getTime(event.endDate)}</p>
                    </div>
                    <div>
                        <p>{event.price <= 0 ? 'FREE' : `$${event.price}`}</p>
                    </div>
                    <div>
                        <p>{event.type}</p>
                    </div>
                    {sessionUser && event.Group.Organizer.id === sessionUser.id &&
                        <OpenModalButton
                            buttonText="delete"
                            modalComponent={<DeleteGroupModal eventId={event.id} groupId={event.Group.id} target='event' />} />}
                </div>
            </div>
            <div>
                <h2>Details</h2>
                <p>{event.description}</p>
            </div>
        </div>
    )
}
