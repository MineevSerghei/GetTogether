import { useHistory } from 'react-router-dom';
import './EventItem.css';


export default function EventItem({ event: { name, previewImage, startDate, id, type, description, Group, EventImages }, group }) {
    const history = useHistory();

    const image = previewImage ||
        (EventImages ? (EventImages[0] ? EventImages[0].url : undefined) : null) || "/images/event-placeholder.png";;

    const dateObj = new Date(startDate);
    const time = dateObj.toTimeString();
    const date = dateObj.toDateString();

    let city = '?';
    let state = '?';
    if (Group) {
        city = Group.city;
        state = Group.state;
    } else if (group) {
        city = group.city;
        state = group.state;
    }

    return (

        <div className="event-item-container" onClick={() => { history.push(`/events/${id}`) }}>
            <div className="event-item">
                <div className='group-item-img-container'>
                    <img className='group-item-img' src={image}></img>
                </div>
                <div className='group-item-info'>
                    <div>
                        <span>{date + ' ' + time}</span>
                    </div>
                    <h2>{name}</h2>
                    <p>{type === 'In person' ? city + ', ' + state : 'Online'}</p>
                </div>
            </div>
            <div>
                <p>{description}</p>
            </div>
        </div>

    )
}
