import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getGroupThunk } from '../../store/groups';
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
                <h2>What we'are about</h2>
                <p>{group.about}</p>
            </div>
            {/* <>Events</> */}
        </div>
    )
}
