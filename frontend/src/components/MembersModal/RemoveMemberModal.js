import { useDispatch } from "react-redux"
// import {}
import { useModal } from "../../context/Modal";

export default function RemoveMemberModal({ target }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const removeMember = async () => {

        closeModal();
    }

    return (
        <div className="delete-form">
            <h2 className="delete-label">Confirm {target === 'request' ? '(Decline)' : '(Remove)'}</h2>
            <p className="delete-mssg">Are you sure you want to {target === 'request' ? 'decline this request' : 'remove this member'}?</p>
            <button className='submit-bttn delete-bttn' onClick={removeMember}>Yes {target === 'request' ? '(Decline)' : '(Remove)'}</button>
            <button className='submit-bttn delete-bttn delete-bttn-no' onClick={() => closeModal()}>No (Keep)</button>
        </div>
    )
}
