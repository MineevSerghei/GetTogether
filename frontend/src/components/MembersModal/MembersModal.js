import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembersOfOneGroupThunk } from '../../store/members';
import Member from './Member';
import './MembersModal.css';

export default function MembersModal({ user, groupId }) {

    const [openTab, setOpenTab] = useState('members');
    const dispatch = useDispatch();
    const members = useSelector(state => state.members.membersOfCurrentGroup);

    const membersArr = [];
    const requestsArr = [];

    for (let i in members) {
        if (members[i].Membership.status === 'pending') requestsArr.push(members[i]);
        else membersArr.push(members[i]);
    }

    useEffect(() => {

        const getMembers = async () => {

            await dispatch(getMembersOfOneGroupThunk(groupId));
        }

        getMembers();

    }, [dispatch])


    if (!members) return null;

    return <div className='members-modal-wrapper'>

        <div className="show-all-header-links">
            <h2
                onClick={() => setOpenTab('members')}
                className={`hover show-all-link-${openTab === 'members' ? 'in' : ''}active`}>Members</h2>
            {(user === 'co-host' || user === 'organizer') && <h2
                onClick={() => setOpenTab('requests')}
                className={`hover show-all-link-${openTab === 'requests' ? 'in' : ''}active`}>Requests</h2>}
        </div>

        {openTab === 'members' && membersArr.map(member => <Member key={member.id} user={user} member={member} groupId={groupId} />)}


        {openTab === 'requests' && requestsArr.map(member => <Member key={member.id} type='request' user={user} member={member} groupId={groupId} />)}

    </div>
}
