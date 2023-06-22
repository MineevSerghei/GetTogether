import './GroupImagesModal.css';

import GroupImageBox from './GroupImageBox';
import { useState } from 'react';

export default function GroupImagesModal({ images, groupId }) {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(false);
    const [errors, setErrors] = useState({});


    const updateImage = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    }

    return <div className="images-modal-div">
        <div className="images-manage-div">
            <div className="image-manage-div">

                <p></p>
                <p>preview?</p>
                <p>delete</p>

            </div>
            <div className="image-manage-div">

                <p></p>
                <p>preview?</p>
                <p>delete</p>

            </div>
            {images.map(image => <GroupImageBox image={image} key={image.id} />)}
        </div>
        <div className="images-add-div">
            <p>Add image</p>
            <input
                className='create-group-image-url'
                type='file'
                accept=".png,.jpg,.jpeg"
                onChange={updateImage}
            ></input><br></br>
            {errors.image && <span className='errors'>{errors.image}</span>}
            <button className='submit-bttn smaller' type='Submit'>Add Image</button>
        </div>
    </div>
}
