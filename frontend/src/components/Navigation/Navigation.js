import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { searchEventsThunk } from '../../store/events';

import './Navigation.css';
import { useState } from 'react';

function Navigation({ isLoaded, setSearchTerm }) {
    const sessionUser = useSelector(state => state.session.user);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const search = async () => {

        if (query) {
            await dispatch(searchEventsThunk({ name: query }));
            setSearchTerm(query);
            history.push(`/events?q=${query}`);
            setQuery('');
        }
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            search();
        }
    }

    return (
        <ul className='nav-links-ul'>
            <li className='home-bttn-li'>
                <NavLink className='home-bttn' exact to="/"><div>Get<br></br> Together</div></NavLink>
            </li>
            <li className='search-li'>
                <input
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={query}
                    type="search"
                    id="search"
                    placeholder='find events'
                    name="q"></input>
                <button className='search-bttn' onClick={search}><i className="fa-solid fa-magnifying-glass search-icon"></i></button>

            </li>
            {!sessionUser && isLoaded &&
                <>
                    <OpenModalMenuItem
                        itemText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalMenuItem
                        itemText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </>
            }
            {isLoaded && sessionUser && (<>
                <li><Link
                    to='/groups/create'
                    className='nav-link log-link'
                >Start a new group</Link></li>

                <li className='user-menu-li'>
                    <ProfileButton user={sessionUser} />
                </li></>
            )}
        </ul>
    );
}

export default Navigation;
