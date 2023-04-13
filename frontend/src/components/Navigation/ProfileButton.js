import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    return (
        user && <>
            <button onClick={openMenu} className='profile-bttn'>
                <div className="icon-container">
                    <i className="fa-solid fa-caret-down" />
                    <i className="fas fa-user-circle" />
                </div>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.username}</li>
                <li>{user.email}</li>
                <li>
                    <button className="logout-bttn" onClick={logout}>Log Out</button>
                </li>

            </ul>
        </>
    );
}

export default ProfileButton;
