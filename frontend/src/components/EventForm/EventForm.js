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
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const getGroup = async () => await dispatch(getGroupThunk(groupId));
        getGroup();

    }, [dispatch])


    if (!sessionUser) return <Redirect to='/'></Redirect>;

    if (group.status !== 'co-host' && group.status !== 'organizer') return <Redirect to='/404'></Redirect>;

    const updateImage = e => {
        setImage(e.target.files[0]);
    }

    const submit = async e => {
        e.preventDefault();

        setErrors({});

        setIsLoading(true);

        const err = {};

        if (name.length <= 0) err.name = 'Name is required';
        if (type !== 'In person' && type !== 'Online') err.type = 'Event Type is required';
        if (isPrivate !== 'false' && isPrivate !== 'true') err.isPrivate = 'Visibility is required';
        if (price.length <= 0) err.price = 'Price is required';
        if (Number(price) < 0 || Number(price) === NaN) err.price = 'Price is invalid';
        if (startDate === '') err.startDate = 'Event start is required';
        if (endDate === '') err.endDate = 'Event end is required';
        if (!image) err.image = 'Image is required';
        if (image && image.size > 1024 * 1024) err.image = 'Image file size must be under 1 MB';
        if (description.length < 30) err.description = 'Description must be at least 30 characters long';
        if (Object.values(err).length > 0) {
            setErrors(err);
            setIsLoading(false);
        }
        else {

            const eventData = {
                name, type,
                private: isPrivate === 'true' ? true : false,
                price,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                description,
                capacity: 10000 // HARDCODED, capacity functionality not implemented on the frontend but it's in the db
            }

            const eventRes = await dispatch(createEventThunk(eventData, group.id));

            if (eventRes && eventRes.errors) {
                setErrors({ ...eventRes.errors });
                setIsLoading(false)
            } else {

                const imageRes = await dispatch(addEventImageThunk(eventRes.id, { preview: true, image: image }));
                if (imageRes && imageRes.errors) {
                    alert("The event has been created but the image url you provided didn't work. You can add images later!");
                }
                setIsLoading(false);
                history.push(`/events/${eventRes.id}`)
            }
        }
    }

    return (
        <form className='create-form event-create-form' onSubmit={submit}>
            <h2>Create an event for {group.name}</h2>

            <div className='input-section'>
                <label>What is the name of your event?</label>
                <input
                    className='create-group-name'
                    placeholder='Event Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                ></input><span className='required-star'>*</span><br></br>
                {errors.name && <span className='errors'>{errors.name}</span>}
            </div>
            <div className='input-section'>
                <label>Is this an in person or online event?</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value='' disabled>(select one)</option>
                    <option value='In person'>In person</option>
                    <option value='Online'>Online</option>
                </select><span className='required-star'>*</span><br></br>
                {errors.type && <span className='errors'>{errors.type}</span>}
                <br></br><label>Is this event private or public?</label>
                <select value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                    <option value='' disabled>(select one)</option>
                    <option value='true'>Private</option>
                    <option value='false'>Public</option>
                </select><span className='required-star'>*</span><br></br>
                {errors.isPrivate && <span className='errors'>{errors.isPrivate}</span>}
                <br></br><label>What is the price for your event?</label>
                <div >
                    <i>$</i><input
                        className='priceInput'
                        placeholder='0'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    ></input><span className='required-star'>*</span><br></br>
                    {errors.price && <span className='errors'>{errors.price}</span>}
                </div>
            </div>
            <div className='input-section'>
                <label>When does your event start?</label>
                <input
                    type='datetime-local'
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                ></input><span className='required-star'>*</span><br></br>
                {errors.startDate && <span className='errors'>{errors.startDate}</span>}
                <br></br><label>When does your event end?</label>
                <input
                    type='datetime-local'
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                ></input><span className='required-star'>*</span><br></br>
                {errors.endDate && <span className='errors'>{errors.endDate}</span>}
            </div>
            <div className='input-section'>
                <label>Please add in image for your event below:</label>
                <input
                    className='create-group-image-url'
                    type='file'
                    accept=".png,.jpg,.jpeg"
                    onChange={updateImage}
                ></input><span className='required-star'>*</span><br></br>
                {errors.image && <span className='errors'>{errors.image}</span>}
            </div>
            <div className='input-section'>
                <label>Please describe your event:</label>
                <textarea
                    className='create-group-about'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea><span className='required-star'>*</span><br></br>
                {errors.description && <span className='errors'>{errors.description}</span>}
            </div>
            <div>
                <button disabled={isLoading} className='submit-bttn' type='Submit'>Create Event</button>
                {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
            </div>

        </form>
    )
}
