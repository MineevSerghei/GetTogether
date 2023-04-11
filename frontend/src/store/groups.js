import { csrfFetch } from "./csrf";


const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const ADD_GROUP_IMAGE = 'groups/ADD_GROUP_IMAGE';

const createGroupAction = (group) => {
    return {
        type: CREATE_GROUP,
        group
    }
}

const addGroupImageAction = (url) => {
    return {
        type: ADD_GROUP_IMAGE,
        url
    }
}

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

export const addGroupImageThunk = (id, image) => async dispatch => {

    try {
        const resImg = await csrfFetch(`/api/groups/${id}/images`, {
            method: 'POST',
            body: JSON.stringify(image)
        });

        const imageData = await resImg.json();

        dispatch(addGroupImageAction(imageData));

        return imageData;

    } catch (e) {
        const errorRes = await e.json()
        return errorRes;
    }

}

export const createGroupThunk = (group) => async dispatch => {


    try {
        const res = await csrfFetch('/api/groups', {
            method: 'POST',
            body: JSON.stringify(group)
        });

        const groupData = await res.json();

        dispatch(createGroupAction(groupData));

        return groupData;

    } catch (e) {

        const errorRes = await e.json()
        return errorRes;
    }

}

export const getGroupThunk = (id) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/groups/${id}`);

        const group = await res.json();
        console.log('data of signgle group fetch, ', group);
        dispatch(getGroupAction(group));
    }
    catch (e) {
        console.log(e)
    }
}

export const getGroupsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/groups');
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

const initialState = {
    allGroups: {},
    singleGroup: {}
};

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
        case CREATE_GROUP:
            {
                return { ...state, [action.group.id]: action.group };
            }
        case ADD_GROUP_IMAGE:
            {
                return { ...state, [action.group.id]: action.group };
            }
        default:
            return state
    }
}

export default groupsReducer;
