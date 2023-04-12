import { csrfFetch } from "./csrf";


const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';
const GET_ONE_EVENT = 'events/GET_ONE_EVENT';

const getEventsAction = (events) => {
    return {
        type: GET_ALL_EVENTS,
        events
    }
}

const getEventAction = (event) => {
    return {
        type: GET_ONE_EVENT,
        event
    }
}

export const getEventThunk = (id) => async dispatch => {
    const res = await csrfFetch(`/api/events/${id}`);

    // console.log('res of signgle event fetch, ', res);

    if (res.ok) {
        const event = await res.json();
        dispatch(getEventAction(event));
    }
}

export const getEventsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/events');
    // console.log("res after fetch on events thunk --->", res);

    const events = await res.json();
    if (res.ok) {
        // console.log("events in res.ok on events thunk --->", events);
        dispatch(getEventsAction(events.Events));
    }
    else {
        // console.log("res in else (errors) on events thunk --->", res);
        return res.errors;
    }
}

const initialState = {
    allEvents: {},
    singleEvent: { EventImages: [] }
}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS:
            {
                const eventsObj = {};
                for (let event of action.events) eventsObj[event.id] = event;
                return { ...state, allEvents: { ...eventsObj } };
            }
        case GET_ONE_EVENT:
            {
                return { ...state, singleEvent: { ...state.singleEvent, ...action.event } };
            }
        default:
            return state
    }
}

export default eventsReducer;
