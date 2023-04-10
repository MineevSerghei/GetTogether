import GroupItem from "./GroupItem";
import { useEffect } from 'react';
import { getGroupsThunk } from "../../store/groups";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllGroupsPage.css';


export default function AllGroupsPage() {

    const dispatch = useDispatch();

    const groups = useSelector((state) => state.groups);

    const groupsArr = Object.values(groups);

    useEffect(() => {

        dispatch(getGroupsThunk());

    }, [dispatch])

    return (
        <div>
            <div>
                <Link>Events</Link>
                <Link>Groups</Link>
            </div>
            <div className="groups-container">
                {groupsArr.map(g => (<GroupItem key={g.id} group={g} />))}
            </div>
        </div>
    )
}
