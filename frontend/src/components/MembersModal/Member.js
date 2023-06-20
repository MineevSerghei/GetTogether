import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeMembershipStatusThunk } from "../../store/members";

export default function Member({ type, user, member, groupId }) {

    const [changeStatusModeOn, setChangeStatusModeOn] = useState(false)
    const [status, setStatus] = useState(member.Membership.status);
    const dispatch = useDispatch();


    if (!member) return null;

    const submitChange = async () => {

        await dispatch(changeMembershipStatusThunk(
            groupId, member.id, type === 'request' ? 'member' : status));

        if (type !== 'request')
            setChangeStatusModeOn(false);
    }

    const removeUser = async () => {

    }

    return <div className="member-box">
        <p>{member.firstName} {member.lastName} </p>
        <div className="user-interactions-div">
            {changeStatusModeOn ?
                <select value={status} onChange={e => setStatus(e.target.value)} >
                    <option value='member'>Member</option>
                    <option value='co-host'>Co-host</option>
                </select>
                : <p>{member.Membership.status}</p>}

            {type === 'request'
                ? <>
                    <i onClick={submitChange}
                        className="fa-solid fa-check user-manage-icon user-manage"></i>
                    {user === 'organizer' && <i onClick={removeUser}
                        className="fa-solid fa-xmark user-manage-icon user-remove"></i>}
                </>

                : <>
                    {user === 'organizer' && <>
                        {changeStatusModeOn ?
                            <i onClick={submitChange}
                                className="fa-solid fa-check user-manage-icon user-manage"></i>
                            : <i onClick={() => setChangeStatusModeOn(true)}
                                className="fa-solid fa-user-pen user-manage-icon user-manage"></i>}
                        <i onClick={removeUser}
                            className="fa-solid fa-user-xmark user-manage-icon user-remove"></i>
                    </>}
                </>
            }
        </div>

    </div>
}
