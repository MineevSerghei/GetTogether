import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const className = sessionUser === null ? " hidden" : '';

    return (
        <ul className='nav-links-ul'>
            <li className='home-bttn-li'>
                <NavLink className='home-bttn' exact to="/"><div>Get<br></br> Together</div></NavLink>
            </li>
            {!sessionUser &&
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
            <li><Link
                to='/groups/create'
                className={'nav-link log-link' + className}
            >Start a new group</Link></li>
            {isLoaded && (
                <li className='user-menu-li'>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
