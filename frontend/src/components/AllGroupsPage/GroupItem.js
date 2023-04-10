import { Link, useHistory } from 'react-router-dom';
import './GroupItem.css';

export default function GroupItem({ group: { id, name, about, previewImage, city, state, type } }) {

    const history = useHistory();

    return (
        <div className="group-item" onClick={() => { history.push(`/groups/${id}`) }}>
            <div>
                <img src={previewImage}></img>
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
