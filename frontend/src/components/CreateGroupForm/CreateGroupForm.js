import { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createGroupThunk, getGroupThunk, updateGroupThunk, addGroupImageThunk } from '../../store/groups';


export default function CreateGroupForm({ formType }) {

    const { groupId } = useParams();
    const group = useSelector(state => state.groups.singleGroup);

    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (formType === 'update') {
            const getGroup = async () => await dispatch(getGroupThunk(groupId));
            getGroup();
        }
    }, [dispatch])

    useEffect(() => {
        if (formType === 'update') {
            setLocation(group.city + ', ' + group.state)
            setName(group.name)
            setAbout(group.about)
            setType(group.type)
            setIsPrivate(group.private === true ? 'true' : 'false')
        }
    }, [])


    if (!sessionUser) return <Redirect to='/'></Redirect>;

    if (formType === 'update' && sessionUser.id !== group.organizerId) return <Redirect to='/'></Redirect>;


    const submit = async e => {
        e.preventDefault();
        setErrors({});
        // console.log('ENTER USEEFFECT, setErrors({}) ---> ', errors);

        const err = {};

        if (location.length <= 0) err.location = 'Location is required';
        if (!location.includes(', ')) err.location = 'Wrong format, please enter [City, STATE]';
        if (name.length <= 0) err.name = 'Name is required';
        if (about.length < 50) err.about = 'Description must be at least 50 characters long';
        if (type !== 'In person' && type !== 'Online') err.type = 'Group Type is required';
        if (isPrivate !== 'false' && isPrivate !== 'true') err.isPrivate = 'Visibility Type is required';

        if (formType === 'create')
            if (!imageUrl.endsWith('.png') &&
                !imageUrl.endsWith('.jpg') &&
                !imageUrl.endsWith('.jpeg')) err.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg';

        //console.log(Object.values(errors).length);

        if (Object.values(err).length > 0) {
            setErrors(err);
        }
        else {
            console.log('ARE YOU IN THE ELSE????');
            const city = location.slice(0, location.indexOf(','));
            const state = location.slice(location.indexOf(',') + 2);
            const groupData = {
                name, about, type,
                private: isPrivate === 'true' ? true : false,
                city, state
            }
            let groupRes;

            if (formType === 'create') groupRes = await dispatch(createGroupThunk(groupData));
            else groupRes = await dispatch(updateGroupThunk(group.id, groupData));

            if (groupRes && groupRes.errors) {
                setErrors({ ...groupRes.errors });
            } else {

                if (formType === 'create') {

                    const imageRes = await dispatch(addGroupImageThunk(groupRes.id, { preview: true, url: imageUrl }));
                    if (imageRes && imageRes.errors) {
                        alert("The group has been created but the image url you provided didn't work. You can add images later!");
                    }
                }
                history.push(`/groups/${groupRes.id}`)

            }

        }
    }

    return (
        <form onSubmit={submit}>
            <h4>BECOME AN ORGANIZER</h4>
            <h2>We'll walk you through a few steps to build your local community</h2>

            <div className='input-section'>
                <h2>First, set your group's location.</h2>
                <p>Gather Together groups meet locally, in person and online. We'll connect you with people
                    in your area, and more can join you online.</p>
                <input
                    placeholder='City, STATE'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                ></input>
                {errors.location && <p className='errors'>{errors.location}</p>}
            </div>
            <div className='input-section'>
                <h2>What will your group's name be?</h2>
                <p>Choose a name that will give people a clear idea of what the group is about.
                    Feel free to get creative! You can edit this later if you change your mind.</p>
                <input
                    placeholder='What is your group name?'
                    value={name}
                    onChange={e => setName(e.target.value)}
                ></input>
                {errors.name && <p className='errors'>{errors.name}</p>}
            </div>
            <div className='input-section'>
                <h2>Now describe what your group will be about</h2>
                <p>People will see this when we promote your group, but you'll be able to add to it later, too</p>
                <ol>
                    <li>What's the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea
                    placeholder='Please write at least 30 characters'
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                ></textarea>
                {errors.about && <p className='errors'>{errors.about}</p>}
            </div>
            <div className='input-section'>
                <h2>Final steps...</h2>

                <p>Is this an in person or online group?</p>
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value=''>(select one)</option>
                    <option value='In person'>In person</option>
                    <option value='Online'>Online</option>
                </select>
                {errors.type && <p className='errors'>{errors.type}</p>}

                <p>Is this group private or public?</p>
                <select value={isPrivate} onChange={e => setIsPrivate(e.target.value)}>
                    <option value=''>(select one)</option>
                    <option value='true'>Private</option>
                    <option value='false'>Public</option>
                </select>
                {errors.isPrivate && <p className='errors'>{errors.isPrivate}</p>}


                {formType === 'create' && <>
                    <p>Please add an image url for your group below:</p>
                    <input
                        placeholder='Image Url'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    ></input>
                    {errors.imageUrl && <p className='errors'>{errors.imageUrl}</p>}
                </>
                }
            </div>
            <div className='input-section'>
                <button type='Submit'>Create group</button>
            </div>
        </form>
    )
}