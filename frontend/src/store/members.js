import { csrfFetch } from "./csrf";


const GET_MEMBERS_OF_GROUP = 'members/GET_MEMBERS_OF_GROUP';


const getMembersOfOneGroupAction = (members) => {
    return {
        type: GET_MEMBERS_OF_GROUP,
        members
    }
}


export const getMembersOfOneGroupThunk = (groupId) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/groups/${groupId}/members`);

        const members = await res.json();



        dispatch(getMembersOfOneGroupAction(members.Members));

        return members;

    } catch (e) {
        console.log('ERROR ===> ', e)
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
        default:
            return state
    }
}

export default membersReducer;
