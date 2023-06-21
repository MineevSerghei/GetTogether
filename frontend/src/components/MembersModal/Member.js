import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeMembershipStatusThunk, removeMemberThunk } from "../../store/members";

export default function Member({ type, user, member, groupId }) {

    const [changeStatusModeOn, setChangeStatusModeOn] = useState(false);
    const [status, setStatus] = useState(member.Membership.status);
    const [removeModeOn, setRemoveModeOn] = useState(false);
    const dispatch = useDispatch();


    if (!member) return null;

    const removeMember = async () => {
        await dispatch(removeMemberThunk(groupId, member.id));
        setRemoveModeOn(false);
    }

    const submitChange = async () => {

        await dispatch(changeMembershipStatusThunk(
            groupId, member.id, type === 'request' ? 'member' : status));

        if (type !== 'request')
            setChangeStatusModeOn(false);
    }

    return <div className="member-box">
        <p className="member-name">{member.firstName} {member.lastName} </p>

        {changeStatusModeOn ?
            <select className="member-status" value={status} onChange={e => setStatus(e.target.value)} >
                <option value='member'>Member</option>
                <option value='co-host'>Co-host</option>
            </select>
            : <p className="member-status">{member.Membership.status}</p>}

        {type === 'request'
            ? <>
                <i onClick={submitChange}
                    className="fa-solid fa-check user-manage-icon user-manage"></i>
                {user === 'organizer' &&
                    <i onClick={() => setRemoveModeOn(true)}
                        className="fa-solid fa-xmark user-manage-icon user-remove"></i>}
            </>

            : <>
                {user === 'organizer' && <>
                    {changeStatusModeOn ?
                        <i onClick={submitChange}
                            className="fa-solid fa-check user-manage-icon user-manage"></i>
                        : <i onClick={() => setChangeStatusModeOn(true)}
                            className="fa-solid fa-user-pen user-manage-icon user-manage"></i>}
                    <i onClick={() => setRemoveModeOn(true)}
                        className="fa-solid fa-user-xmark user-manage-icon user-remove"></i>

                </>}
            </>
        }


        {removeModeOn &&
            <>
                {type === 'request'
                    ? <p className="confirmation-p-tag">Are you sure you want to decline <mark>{member.firstName} {member.lastName}'s</mark> request?</p>
                    : <p className="confirmation-p-tag">Are you sure you want to remove <mark>{member.firstName} {member.lastName}</mark> from members?</p>}
                <button onClick={() => setRemoveModeOn(false)} className="confirm-remove-member member-remove-not">No</button>
                <button onClick={removeMember} className="confirm-remove-member member-remove">Yes</button>
            </>}

    </div>
}
