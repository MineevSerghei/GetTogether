import { useHistory } from 'react-router-dom';
import './EventItem.css';


export default function EventItem({ event: { name, previewImage, startDate, city, state, id, type, description, Venue } }) {
    const history = useHistory();

    return (

        <div className="event-item" onClick={() => { history.push(`/events/${id}`) }}>
            <div className="event-item-head">
                <div className='event-item-img-container'>
                    <img className='event-item-img' src={previewImage}></img>
                </div>
                <div>
                    <div>
                        <span>{startDate}</span>
                    </div>
                    <h2>{name}</h2>
                    <p>{type === 'In person' ? Venue.city + ', ' + Venue.state : 'Online'}</p>
                </div>
            </div>
            <div>
                <p>{description}</p>
            </div>
        </div>
    )
}
