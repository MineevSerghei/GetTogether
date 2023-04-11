import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CreateGroupForm() {

    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to='/'></Redirect>;


    const submit = e => {
        e.preventDefault();

        const err = {};


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
            </div>
            <div className='input-section'>
                <h2>Now describe what your group will be about</h2>
                <p>People will see this when we promote your group, but you'll be able to add to it later, too</p>
                <ol>
                    <li>What's the purpose of the group?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <input
                    placeholder='Please write at least 30 characters'
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                ></input>
            </div>
            <div className='input-section'>
                <h2>Final steps...</h2>

                <p>Is this an in person or online group?</p>
                <select onChange={e => setType(e.target.value)}>
                    <option value=''>(select one)</option>
                    <option value='In person'>In person</option>
                    <option value='Online'>Online</option>
                </select>

                <p>Is this group private or public?</p>
                <select onChange={e => setIsPrivate(e.target.value)}>
                    <option value={''}>(select one)</option>
                    <option value={true}>Private</option>
                    <option value={false}>Public</option>
                </select>

                <p>Please add an image url for your group below:</p>

                <input
                    placeholder='Image Url'
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                ></input>
            </div>
            <div className='input-section'>
                <button type='Submit'>Create group</button>
            </div>
        </form>
    )
}
