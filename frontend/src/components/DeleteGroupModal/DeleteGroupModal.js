import { useDispatch } from "react-redux"
import { deleteGroupThunk } from "../../store/groups";
import { deleteEventThunk } from "../../store/events";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteModal.css';

export default function DeleteGroupModal({ groupId, target, eventId }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deleteGroup = async () => {

        let res;
        let pushPath = ''

        if (target === 'group') {
            res = await dispatch(deleteGroupThunk(groupId));
            pushPath = '/groups';
        } else if (target === 'event') {
            res = await dispatch(deleteEventThunk(eventId));
            pushPath = `/groups/${groupId}`;
        }

        if (res.ok) {
            history.push(pushPath);
            closeModal();
        }
        else {
            const errors = await res.json();
            alert(errors.message);
            closeModal();
            history.push(pushPath);
        }
    }


    return (
        <div className="delete-form">
            <h2 className="delete-label">Confirm Delete</h2>
            <p className="delete-mssg">Are you sure you want to remove this {target}?</p>
            <button className='submit-bttn delete-bttn' onClick={deleteGroup}>Yes (Delete {target[0].toUpperCase() + target.slice(1)})</button>
            <button className='submit-bttn delete-bttn delete-bttn-no' onClick={() => closeModal()}>No (Keep {target[0].toUpperCase() + target.slice(1)})</button>
        </div>
    )
}
