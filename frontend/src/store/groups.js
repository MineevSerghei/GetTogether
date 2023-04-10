
const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP';

const getGroupsAction = (groups) => {
    return {
        type: GET_ALL_GROUPS,
        groups
    }
}

const getGroupAction = (group) => {
    return {
        type: GET_ONE_GROUP,
        group
    }
}

export const getGroupThunk = (id) => async dispatch => {
    const res = await fetch(`/api/groups/${id}`);

    console.log('res of signgle group fetch, ', res);

    if (res.ok) {
        const group = await res.json();
        console.log('data of signgle group fetch, ', group);
        dispatch(getGroupAction(group));
    }
}

export const getGroupsThunk = () => async dispatch => {
    const res = await fetch('/api/groups');
    // console.log("res after fetch on groups thunk --->", res);

    const groups = await res.json();
    if (res.ok) {
        // console.log("groups in res.ok on groups thunk --->", groups);
        dispatch(getGroupsAction(groups.Groups));
    }
    else {
        // console.log("res in else (errors) on groups thunk --->", res);
        return res.errors;
    }
}

const groupsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_GROUPS:
            {
                const groupsObj = {};
                for (let group of action.groups) groupsObj[group.id] = group;
                return groupsObj;
            }
        case GET_ONE_GROUP:
            {
                return { ...state, [action.group.id]: action.group };
            }
        default:
            return state
    }
}

export default groupsReducer;
