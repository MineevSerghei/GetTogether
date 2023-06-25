import { useEffect } from 'react';
import { getMyGroupsThunk } from "../../store/groups";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupItem from '../AllGroupsPage/GroupItem';
import './MyGroupsPage.css';


export default function MyGroupsPage() {

    const dispatch = useDispatch();

    const groups = useSelector((state) => state.groups.myGroups);

    const groupsArr = Object.values(groups);

    useEffect(() => {

        dispatch(getMyGroupsThunk());

    }, [dispatch])

    return (
        <div className="groups-page-container">
            <div className="groups-container">
                <div className="show-all-head">
                    <div className="show-all-header-links">
                        <h2 className="show-all-link-inactive">My Groups</h2>
                    </div>
                    <p>My Groups in <span className="get-together-span">GetTogether</span></p>
                </div>
                <div className="event-group-items">
                    {groupsArr.length <= 0 ? <h2>You are not a part of any groups yet..</h2> : groupsArr.map(g => (<GroupItem key={g.id} group={g} />))}
                </div>
            </div>
        </div>
    )
}
