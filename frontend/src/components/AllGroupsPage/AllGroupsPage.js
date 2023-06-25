import { useEffect } from 'react';
import { searchGroupsThunk } from "../../store/groups";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupItem from "./GroupItem";
import './AllGroupsPage.css';


export default function AllGroupsPage({ searchTerm, setSearchTerm }) {

    const dispatch = useDispatch();

    const groups = useSelector((state) => state.groups.allGroups);

    const groupsArr = Object.values(groups);

    useEffect(() => {
        const findGroups = async () => {

            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('q');
            const params = {};

            if (name) {
                params.name = name;
                setSearchTerm(name);
            } else {
                setSearchTerm('');
            }

            await dispatch(searchGroupsThunk(params));
        }

        findGroups();

    }, [dispatch])

    return (
        <div className="groups-page-container">
            <div className="groups-container">
                <div className="show-all-head">
                    <div className="show-all-header-links">
                        <Link className="show-all-link-active" to='/events'><h2>All Events</h2></Link>
                        <h2 className="show-all-link-inactive">{searchTerm ? 'Groups' : 'All Groups'}</h2>
                    </div>
                    {searchTerm ? <p>Search results for: <span className="get-together-span">{searchTerm}</span></p>
                        : <p>All Groups in <span className="get-together-span">GetTogether</span></p>}
                </div>
                <div className="event-group-items">
                    {groupsArr.length <= 0 ? <h4>No groups found :(</h4> :
                        <>
                            {groupsArr.map(g => (<GroupItem key={g.id} group={g} />))}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
