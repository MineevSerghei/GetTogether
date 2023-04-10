import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getGroupThunk } from '../../store/groups';

export default function GroupDetailsPage() {

    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups[groupId]);

    useEffect(() => {
        dispatch(getGroupThunk(groupId));
    }, [dispatch])

    // console.log('ORGANIZER ---->  ', group.Organizer)

    if (!group || !group.Organizer) return <h3>Loading...</h3>

    return (
        <div>
            <div className="group-details-container">
                <Link to='/groups'> {"<- Groups"}</Link>
                <div>
                    <img></img>
                </div>
                <div>
                    <h2>{group.name}</h2>
                    <p>{group.city + ', ' + group.state}</p>
                    <p>events . type</p>
                    <p>{group.Organizer.firstName + ' ' + group.Organizer.lastName}</p>
                    <button>Join this group</button>
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
