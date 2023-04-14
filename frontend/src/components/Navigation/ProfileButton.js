import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/');
    };

    const viewGroups = e => {
        closeMenu();
        history.push('/groups');
    }

    const viewEvents = e => {
        closeMenu();
        history.push('/events');
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    return (
        <>
            <button onClick={openMenu} className='profile-bttn'>
                <div className="icon-container">
                    <i className="fa-solid fa-caret-down" />
                    <i className="fas fa-user-circle" />
                </div>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>Hello, {user.firstName}!</li>
                <li>{user.email}</li>
                <li>
                    <button className="logout-bttn" onClick={viewGroups}>View groups</button>
                </li>
                <li>
                    <button className="logout-bttn" onClick={viewEvents}>View events</button>
                </li>
                <li>
                    <button className="logout-bttn" onClick={logout}>Log Out</button>
                </li>

            </ul>
        </>
    );
}

export default ProfileButton;
