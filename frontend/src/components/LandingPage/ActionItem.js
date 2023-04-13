import { Link } from 'react-router-dom'

import './ActionItem.css';


export default function ActionItem({ link: { url, text }, sessionUser, description, img }) {

    const className = sessionUser === null ? " disabled-link" : '';


    return (
        <div className='action-item-container'>
            <img src={img}
                className='action-image'
            ></img>
            <Link
                to={url}
                className={'action-link' + className}
            >{text}</Link>
            <p
                className='action-info'
            >{description}</p>
        </div>
    )
}
