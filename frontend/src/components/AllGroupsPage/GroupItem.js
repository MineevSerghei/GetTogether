import { useHistory } from 'react-router-dom';
import './GroupItem.css';

export default function GroupItem({ group: { id, name, about, previewImage, city, state, type } }) {

    const image = previewImage || "/images/group-placeholder.png";

    const history = useHistory();

    return (
        <div className="group-item" onClick={() => { history.push(`/groups/${id}`) }}>
            <div className='group-item-img-container'>
                <img className='group-item-img' src={image}></img>
            </div>
            <div>
                <h2>{name}</h2>
                <p>{city + ', ' + state}</p>
                <p>{about}</p>
                <div>
                    <span>events . {type}</span>
                </div>
            </div>
        </div>
    )
}
