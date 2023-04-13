import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const className = sessionUser === null ? " hidden" : '';

    return (
        <ul className='nav-links-ul'>
            <li >
                <NavLink className='home-bttn' exact to="/"><div>Get<br></br> Together</div></NavLink>
            </li>
            <li><Link
                to='/groups/create'
                className={'nav-link' + className}
            >Start a new group</Link></li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
