import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='nav-links-ul'>
            <li className='home-bttn-li'>
                <NavLink className='home-bttn' exact to="/"><div>Get<br></br> Together</div></NavLink>
            </li>
            <li className='search-li'>
                {/* <label for="site-search"></label> */}
                <input
                    type="search"
                    id="search"
                    placeholder='search for groups and events'
                    name="q"></input>
                <button>Search</button>

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
