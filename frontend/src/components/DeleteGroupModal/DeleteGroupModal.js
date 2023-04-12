import { useDispatch } from "react-redux"
import { deleteGroupThunk } from "../../store/groups";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

export default function DeleteGroupModal({ id }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deleteGroup = async () => {

        const res = await dispatch(deleteGroupThunk(id));

        if (res.ok) {
            history.push('/groups');
            closeModal();
        }
        else {
            const errors = await res.json();
            alert(errors.message);
            closeModal();
            history.push('/groups');
        }
    }


    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this group?</p>
            <button onClick={deleteGroup}>Yes (Delete Group)</button>
            <button onClick={() => closeModal()}>No (Keep Group)</button>
        </div>
    )
}
