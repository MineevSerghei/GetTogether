import { useHistory } from 'react-router-dom';
import './EventItem.css';


export default function EventItem({ event: { name, previewImage, startDate, id, type, description, Venue, EventImages } }) {
    const history = useHistory();

    const image = previewImage ||
        (EventImages ? (EventImages[0] ? EventImages[0].url : undefined) : null) || "/images/event-placeholder.png";;

    const dateObj = new Date(startDate);
    const time = dateObj.toTimeString();
    const date = dateObj.toDateString();

    return (

        <div className="event-item" onClick={() => { history.push(`/events/${id}`) }}>
            <div className="event-item-head">
                <div className='event-item-img-container'>
                    <img className='event-item-img' src={image}></img>
                </div>
                <div>
                    <div>
                        <span>{date + ' ' + time}</span>
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