import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getGroupThunk } from '../../store/groups';
import EventItem from '../AllEventsPage/EventItem';
import OpenModalButton from '../OpenModalButton';
import DeleteGroupModal from '../DeleteGroupModal';
import './GroupDetailsPage.css'

export default function GroupDetailsPage() {

    const [image, setImage] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    const { groupId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const group = useSelector(state => state.groups.singleGroup);

    useEffect(() => {
        dispatch(getGroupThunk(groupId));
    }, [dispatch])

    const changeImg = () => {
        setImage((image + 1) % group.GroupImages.length)
    }

    const updateGroup = () => {
        history.push(`/groups/${groupId}/update`);
    }

    const createEvent = () => {
        history.push(`/groups/${groupId}/events/create`);
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

    if (!group || !group.Organizer || +group.id !== +groupId) return null;


    return (
        <div>
            <div className="group-details-container">
                <Link to='/groups'> {"<- Groups"}</Link>
                <div>
                    <img
                        src={group.GroupImages.length > 0 ? group.GroupImages[image].url : ""}
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
                    {sessionUser && sessionUser.id === group.Organizer.id && <>
                        <button onClick={createEvent}>create event</button>
                        <button onClick={updateGroup}>update</button>
                        <OpenModalButton
                            buttonText="delete"
                            modalComponent={<DeleteGroupModal groupId={group.id} target='group' />} /></>}
                </div>
            </div>
            <div>
                <h2>Organizer</h2>
                <p>{group.Organizer.firstName + ' ' + group.Organizer.lastName}</p>
                <h2>What we're about</h2>
                <p>{group.about}</p>
            </div>
            {group.Events.length === 0 && <h2>No Upcoming Events</h2>}
            {group.Events.length > 0 && renderEvents(group.Events)}
        </div>
    )
}
