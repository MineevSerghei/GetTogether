import { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGroupThunk } from '../../store/groups';
import { createEventThunk, addEventImageThunk } from '../../store/events';
import './EventForm.css';

export default function EventForm() {

    const { groupId } = useParams();
    const group = useSelector(state => state.groups.singleGroup);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const getGroup = async () => await dispatch(getGroupThunk(groupId));
        getGroup();

    }, [dispatch])


    if (!sessionUser) return <Redirect to='/'></Redirect>;

    if (sessionUser.id !== group.organizerId) return <Redirect to='/'></Redirect>;


    const submit = async e => {
        e.preventDefault();

        // console.log(new Date(startDate))
        alert('coming soon!')
        return;
        setErrors({});

        const err = {};

        if (name.length <= 0) err.name = 'Name is required';
        if (type !== 'In person' && type !== 'Online') err.type = 'Event Type is required';
        if (isPrivate !== 'false' && isPrivate !== 'true') err.isPrivate = 'Visibility is required';
        if (price.length <= 0) err.price = 'Price is required';
        if (Number(price) <= 0 || Number(price) === NaN) err.price = 'Price is invalid';
        if (startDate === '') err.startDate = 'Event start is required';
        if (endDate === '') err.endDate = 'Event end is required';
        if (!imageUrl.endsWith('.png') &&
            !imageUrl.endsWith('.jpg') &&
            !imageUrl.endsWith('.jpeg')) err.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg';
        if (description.length < 30) err.description = 'Description must be at least 30 characters long';

        if (Object.values(err).length > 0) {
            setErrors(err);
        }
        else {

            const eventData = {
                name, type,
                private: isPrivate === 'true' ? true : false,
                price,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                description,
                capacity: 100 // HARDCODED, capacity functionality not implemented on the frontend but it's a required key in db
            }

            const eventRes = await dispatch(createEventThunk(group.id, eventData));

            if (eventRes && eventRes.errors) {
                setErrors({ ...eventRes.errors });
            } else {

                const imageRes = await dispatch(addEventImageThunk(eventRes.id, { preview: true, url: imageUrl }));
                if (imageRes && imageRes.errors) {
                    alert("The group has been created but the image url you provided didn't work. You can add images later!");
                }

                history.push(`/events/${eventRes.id}`)
            }
        }
    }

    return (
        <form onSubmit={submit}>
            <h2>Create an event for {group.name}</h2>
            <div>
                <div>
                    <p>What is the name of your event?</p>
                    <input
                        placeholder='Event Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Is this an in person or online event?</p>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value=''>(select one)</option>
                        <option value='In person'>In person</option>
                        <option value='Online'>Online</option>
                    </select>

                    <p>Is this event private or public?</p>
                    <select value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                        <option value=''>(select one)</option>
                        <option value='true'>Private</option>
                        <option value='false'>Public</option>
                    </select>

                    <p>What is the price for your event?</p>
                    <div >
                        <i>$</i><input
                            className='priceInput'
                            placeholder='0'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <p>When does your event start?</p>
                    <input
                        type='datetime-local'
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    ></input>
                    <p>When does your event end?</p>
                    <input
                        type='datetime-local'
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Please add in image url for your event below:</p>
                    <input
                        placeholder='Image Url'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Please describe your event:</p>
                    <textarea
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <button type='Submit'>Create Event</button>
                </div>
            </div>
        </form>
    )
}
