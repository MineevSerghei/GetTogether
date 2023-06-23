import './GroupImagesModal.css';

import GroupImageBox from './GroupImageBox';
import { useState, useEffect } from 'react';
import { addGroupImageThunk } from '../../store/groups';
import { useDispatch } from 'react-redux';

export default function GroupImagesModal({ images, groupId }) {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [, forceRerender] = useState(1);
    const dispatch = useDispatch();

    const updateImage = e => {
        setImage(e.target.files[0]);
    }

    const addImage = async () => {

        setIsLoading(true)
        setErrors({});
        const err = {};

        if (!image) err.image = 'Image is required';
        if (image && image.size > 1024 * 1024) err.image = 'Image file size must \nbe under 1 MB';

        if (Object.values(err).length > 0) {
            setErrors(err);
            setIsLoading(false);
        } else {
            const imageRes = await dispatch(addGroupImageThunk(groupId, { preview: preview, image: image }));
            if (imageRes && imageRes.errors) {
                setErrors({ ...imageRes.errors });
            } else {
                const input = document.getElementById('upload-input');
                input.value = '';
                setImage(null);
                setPreview(false);
                setIsLoading(false);
            }
        }

    }

    return <div className="images-modal-div">
        <div className="images-manage-div">
            <div className="image-manage-div">

                <p></p>
                <p>preview</p>
                <p>delete</p>

            </div>
            <div className="image-manage-div">

                <p></p>
                <p>preview</p>
                <p>delete</p>

            </div>
            {images.map(image => <GroupImageBox image={image} key={image.id} />)}
        </div>
        <div className="images-add-div">
            <p className='add-image-p-tag'>Add image</p>
            <input
                id='upload-input'
                className='create-group-image-url'
                type='file'
                accept=".png,.jpg,.jpeg"
                onChange={updateImage}
            ></input>
            <label><input type='checkbox' chacked={preview} onChange={e => setPreview(e.target.checked)}></input> Set as preview image?</label>
            {errors.image && <span className='errors down-left'>{errors.image}</span>}
            <button disabled={isLoading} className='submit-bttn smaller' onClick={addImage}>{isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : 'Add Image'}</button>

        </div>
    </div>
}
