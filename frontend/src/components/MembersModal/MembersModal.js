import { useState } from 'react';
import './MembersModal.css';

export default function MembersModal({ user }) {

    const [openTab, setOpenTab] = useState('members');




    return <div className='members-modal-wrapper'>

        <div className="show-all-header-links">
            <h2
                onClick={() => setOpenTab('members')}
                className={`hover show-all-link-${openTab === 'members' ? 'in' : ''}active`}>Members</h2>
            {(user === 'co-host' || user === 'organizer') && <h2
                onClick={() => setOpenTab('requests')}
                className={`hover show-all-link-${openTab === 'requests' ? 'in' : ''}active`}>Requests</h2>}
        </div>

        {openTab === 'members' && <p>members here</p>}


        {openTab === 'requests' && <p> requests here</p>}


        <p>I'm a {user}</p>
    </div>
}
