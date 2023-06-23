import { useState } from "react"
import { deleteGroupImageThunk } from "../../store/groups";
import { useDispatch } from "react-redux";

export default function GroupImageBox({ image }) {

    const [deleteModeOn, setDeleteModeOn] = useState(false);
    const dispatch = useDispatch();

    const deleteImage = async () => {
        await dispatch(deleteGroupImageThunk(image.id));
    }

    return <div className="image-manage-div">
        <img className="img-manage" src={image.url}></img>
        <p>{image.preview ? 'yes' : 'no'}</p>
        {deleteModeOn
            ? <div className="confirm-delete-img"><p className="confirm-delete-p-tag">Delete?</p>
                <button onClick={deleteImage} className="confirm-remove-member member-remove">Yes</button>
                <button onClick={() => setDeleteModeOn(false)} className="confirm-remove-member member-remove-not">No</button>
            </div>
            : <i onClick={e => setDeleteModeOn(true)} className="fa-solid fa-trash-can img-remove"></i>}
    </div>
}
