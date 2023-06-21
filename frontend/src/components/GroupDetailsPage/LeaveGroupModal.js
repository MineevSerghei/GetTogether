import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { leaveGroupThunk } from "../../store/groups";

export default function LeaveGroupModal({ groupId, memberId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const leaveGroup = async () => {
        await dispatch(leaveGroupThunk(groupId, memberId))
        closeModal();
    }

    return (
        <div className="delete-form">
            <h2 className="delete-label">Confirm Leave</h2>
            <p className="delete-mssg">Are you sure you want to leave this group?</p>
            <button className='submit-bttn delete-bttn' onClick={leaveGroup}>Yes (Leave)</button>
            <button className='submit-bttn delete-bttn delete-bttn-no' onClick={() => closeModal()}>No (Stay)</button>
        </div>
    )
}
