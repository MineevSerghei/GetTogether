import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getGroupThunk } from '../../store/groups';
import EventItem from '../AllEventsPage/EventItem';
import './GroupDetailsPage.css'

export default function GroupDetailsPage() {

    const dispatch = useDispatch();
    const { groupId } = useParams();

    const group = useSelector(state => state.groups[groupId]);
    const sessionUser = useSelector((state) => state.session.user);

    const [image, setImage] = useState(0);

    useEffect(() => {
        dispatch(getGroupThunk(groupId));
    }, [dispatch])

    const changeImg = () => {
        setImage((image + 1) % group.GroupImages.length)
    }

    const renderEvents = (events) => {

        const past = [];
        const future = [];

        for (let event of events) {
            if (Date(event.startDate) < Date.now()) {
                past.push(event);
            } else {
                future.push(event);
            }
        }

        return (
            <>
                {future.length > 0 &&
                    <div>
                        <h2>Upcoming Events {`(${future.length})`}</h2>
                        <div className="group-details-events-container">
                            {future.map(e => <EventItem key={e.id} event={e} />)}
                        </div>
                    </div>
                }

                {past.length > 0 &&
                    <div>
                        <h2>Past Events {`(${past.length})`}</h2>
                        <div className="group-details-events-container">
                            {past.map(e => <EventItem key={e.id} event={e} />)}
                        </div>
                    </div>
                }
            </>
        )
    }

    if (!group || !group.Organizer) return <h3>Loading...</h3>


    return (
        <div>
            <div className="group-details-container">
                <Link to='/groups'> {"<- Groups"}</Link>
                <div>
                    <img
                        src={group.GroupImages[image].url}
                        onClick={changeImg}
                        className='group-details-img'
                    ></img>
                </div>
                <div>
                    <h2>{group.name}</h2>
                    <p>{group.city + ', ' + group.state}</p>
                    <p>events . type</p>
                    <p>{group.Organizer.firstName + ' ' + group.Organizer.lastName}</p>
                    {sessionUser && sessionUser.id !== group.Organizer.id &&
                        <button onClick={() => alert('This feature is coming soon!')}>Join this group</button>}
                </div>
            </div>
            <div>
                <h2>Organizer</h2>
                <p>{group.Organizer.firstName + ' ' + group.Organizer.lastName}</p>
                <h2>What we're about</h2>
                <p>{group.about}</p>
            </div>
            {group.Events.length > 0 && renderEvents(group.Events)}
        </div>
    )
}
