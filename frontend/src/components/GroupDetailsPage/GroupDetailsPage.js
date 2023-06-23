import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getGroupThunk, requestMembershipThunk } from '../../store/groups';
import { Carousel } from 'react-responsive-carousel';
import LeaveGroupModal from './LeaveGroupModal';
import EventItem from '../AllEventsPage/EventItem';
import OpenModalButton from '../OpenModalButton';
import DeleteGroupModal from '../DeleteGroupModal';
import MembersModal from '../MembersModal';
import GroupImagesModal from '../GroupImagesModal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './GroupDetailsPage.css'

export default function GroupDetailsPage() {

    const [image, setImage] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    const { groupId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const group = useSelector(state => state.groups.singleGroup);

    let images = null;
    if (group && group.GroupImages)
        images = Object.values(group.GroupImages);

    useEffect(() => {
        const getGroup = async () => {
            const res = await dispatch(getGroupThunk(groupId));
            if (res instanceof Response && res.status === 404) history.push('/404')
        }
        getGroup();

    }, [dispatch])

    const chooseImg = () => {
        if (images.length > 0) {
            if (images[image]) {
                return images[image].url
            } else {
                return images[0].url
            }
        } else {
            return '';
        }
    }


    const changeImg = () => {
        setImage((image + 1) % images.length)
    }

    const updateGroup = () => {
        history.push(`/groups/${groupId}/update`);
    }

    const createEvent = () => {
        history.push(`/groups/${groupId}/events/create`);
    }

    const sendRequest = async () => {
        await dispatch(requestMembershipThunk(groupId));
    }

    const renderEvents = (events) => {

        const pastUnsorted = [];
        const futureUnsorted = [];

        for (let event of events) {
            if ((new Date(event.startDate).getTime()) < Date.now()) {
                pastUnsorted.push(event);
            } else {
                futureUnsorted.push(event);
            }
        }

        const past = pastUnsorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        const future = futureUnsorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        return (
            <>
                {future.length > 0 &&
                    <div className='events-list-groups'>
                        <h2>Upcoming Events {`(${future.length})`}</h2>
                        <div className="group-details-events-container">
                            {future.map(e => <EventItem key={e.id} event={e} group={group} />)}
                        </div>
                    </div>
                }

                {past.length > 0 &&
                    <div className='events-list-groups'>
                        <h2>Past Events {`(${past.length})`}</h2>
                        <div className="group-details-events-container">
                            {past.map(e => <EventItem key={e.id} event={e} group={group} />)}
                        </div>
                    </div>
                }
            </>
        )
    }



    if (!group || !images || !group.Organizer || +group.id !== +groupId) return null;

    return (
        <div className='details-page'>
            <div className="group-details-container">
                <div className='details-img-container'>
                    <Link to='/groups'> {"< All Groups"}</Link>
                    <Carousel dynamicHeight={true} infiniteLoop={true}>
                        {images.map(image => <div className='group-details-img-div'>
                            <img
                                src={image.url}
                            ></img>
                        </div>)}
                    </Carousel>
                    {/* {images.length > 1 && <i onClick={changeImg} className="fa-solid fa-arrow-right next-image-icon"></i>} */}

                </div>
                <div>
                    <h2>{group.name}</h2>
                    <p>{group.city + ', ' + group.state}</p>
                    <p>{group.numMembers > 1 ? `${group.numMembers} members` : group.numMembers <= 0 ? 'no members' : `${group.numMembers} member`} · {group.private ? 'Private' : 'Public'}</p>
                    <p>{'Organized by ' + group.Organizer.firstName + ' ' + group.Organizer.lastName}</p>
                    {sessionUser && group.status === 'none' &&
                        <button className='submit-bttn' onClick={sendRequest}>Join this group</button>}
                    {sessionUser && group.status === 'organizer' &&
                        <div className='manage-bttns-container'>
                            <OpenModalButton
                                buttonText="Images"
                                className="manage-bttn"
                                modalComponent={<GroupImagesModal groupId={group.id} />} />
                            <OpenModalButton
                                buttonText="Members"
                                className="manage-bttn"
                                modalComponent={<MembersModal user='organizer' groupId={group.id} />} />
                            <button className="manage-bttn" onClick={createEvent}>Create event</button>
                            <button className="manage-bttn" onClick={updateGroup}>Update</button>
                            <OpenModalButton
                                buttonText="Delete"
                                className="manage-bttn"
                                modalComponent={<DeleteGroupModal groupId={group.id} target='group' />} />
                        </div>}
                    {sessionUser && group.status === 'co-host' &&
                        <div className='manage-bttns-container'>
                            <button className="manage-bttn" onClick={createEvent}>Create event</button>
                            <OpenModalButton
                                buttonText="Leave Group"
                                className="manage-bttn"
                                modalComponent={<LeaveGroupModal groupId={group.id} memberId={sessionUser.id} />} />
                            <OpenModalButton
                                buttonText="Members"
                                className="manage-bttn"
                                modalComponent={<MembersModal user='co-host' groupId={group.id} />} />

                        </div>}
                    {sessionUser && group.status === 'pending' &&
                        <div className='manage-bttns-container'>
                            <h3>The join request was sent!</h3>
                        </div>}
                    {sessionUser && group.status === 'member' &&
                        <div className='manage-bttns-container'>
                            <OpenModalButton
                                buttonText="Leave Group"
                                className="manage-bttn"
                                modalComponent={<LeaveGroupModal groupId={group.id} memberId={sessionUser.id} />} />
                            <OpenModalButton
                                buttonText="Members"
                                className="manage-bttn"
                                modalComponent={<MembersModal user='member' groupId={group.id} />} />
                        </div>}
                    {!sessionUser &&
                        <div className='manage-bttns-container'>
                            <h3>Sign in to join!</h3>
                        </div>}
                </div>
            </div>
            <div >
                <h2>Organized by:</h2>
                <p>{group.Organizer.firstName + ' ' + group.Organizer.lastName}</p>
                <h2>What we're about</h2>
                <p>{group.about}</p>
            </div>
            {group.Events.length === 0 && <h2>No Upcoming Events</h2>}
            {group.Events.length > 0 && renderEvents(group.Events)}
        </div>
    )
}
