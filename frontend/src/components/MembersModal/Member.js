import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeMembershipStatusThunk } from "../../store/members";

export default function Member({ type, user, member, groupId }) {

    const [changeStatusModeOn, setChangeStatusModeOn] = useState(false);
    const [status, setStatus] = useState(member.Membership.status);
    const [removeModeOn, setRemoveModeOn] = useState(false);
    const dispatch = useDispatch();


    if (!member) return null;

    const removeMember = () => {

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
                <p className="confirmation-p-tag">Are you sure you want to remove <mark>{member.firstName} {member.lastName}</mark> from members?</p>
            </>}

    </div>
}


{/* <OpenModalButton
    className="fa-solid fa-xmark user-manage-icon user-remove"
    isIcon={true}
    modalComponent={<RemoveMemberModal target='request' />} /> */}

{/* <OpenModalButton
    className="fa-solid fa-user-xmark user-manage-icon user-remove"
    isIcon={true}
    modalComponent={<RemoveMemberModal target='member' />} /> */}
