import { csrfFetch } from "./csrf";


const GET_MEMBERS_OF_GROUP = 'members/GET_MEMBERS_OF_GROUP';
const CHANGE_MEMBERSHIP_STATUS = 'members/CHANGE_MEMBERSHIP_STATUS';
const REMOVE_MEMBER = 'members/REMOVE_MEMBER';

const getMembersOfOneGroupAction = (members) => {
    return {
        type: GET_MEMBERS_OF_GROUP,
        members
    }
}

const removeMemberAction = (memberId) => {
    return {
        type: REMOVE_MEMBER,
        memberId
    }
}

const changeMembershipStatusAction = (memberId, status) => {
    return {
        type: CHANGE_MEMBERSHIP_STATUS,
        memberId,
        status
    }
}

export const removeMemberThunk = (groupId, memberId) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
            method: 'DELETE',
            body: JSON.stringify({ memberId })
        });

        const data = await res.json();

        dispatch(removeMemberAction(memberId));

        return data;

    } catch (e) {
        const errorRes = await e.json()
        return errorRes;
    }

}

export const changeMembershipStatusThunk = (groupId, memberId, status) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
            method: 'PUT',
            body: JSON.stringify({ memberId, status })
        });

        const data = await res.json();

        dispatch(changeMembershipStatusAction(data.memberId, data.status));

        return data;

    } catch (e) {
        const errorRes = await e.json()
        return errorRes;
    }

}

export const getMembersOfOneGroupThunk = (groupId) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/groups/${groupId}/members`);

        const members = await res.json();

        dispatch(getMembersOfOneGroupAction(members.Members));

        return members;

    } catch (e) {
        const errorRes = await e.json()
        return errorRes;
    }

}

const initialState = {
    membersOfCurrentGroup: {},
}

const membersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBERS_OF_GROUP:
            {
                const membersObj = {};
                for (let member of action.members) membersObj[member.id] = member;
                return { ...state, membersOfCurrentGroup: membersObj };
            }
        case CHANGE_MEMBERSHIP_STATUS:
            {
                const member = { ...state.membersOfCurrentGroup[action.memberId] }
                member.Membership = { status: action.status }
                return { ...state, membersOfCurrentGroup: { ...state.membersOfCurrentGroup, [action.memberId]: member } };
            }

        case REMOVE_MEMBER:
            {
                const newState = { ...state, membersOfCurrentGroup: { ...state.membersOfCurrentGroup } };
                delete newState.membersOfCurrentGroup[action.memberId];
                return newState;
            }
        default:
            return state
    }
}

export default membersReducer;
