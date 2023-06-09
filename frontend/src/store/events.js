import { csrfFetch } from "./csrf";


const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';
const GET_ONE_EVENT = 'events/GET_ONE_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';
const CREATE_EVENT = 'events/CREATE_EVENT';
const ADD_EVENT_IMAGE = 'events/ADD_EVENT_IMAGE';
const SEARCH_EVENTS = 'events/SEARCH_EVENTS';

const createEventAction = (event) => {
    return {
        type: CREATE_EVENT,
        event
    }
}

const addEventImageAction = (image) => {
    return {
        type: ADD_EVENT_IMAGE,
        image
    }
}

const getEventsAction = (events) => {
    return {
        type: GET_ALL_EVENTS,
        events
    }
}

const searchEventsAction = (events) => {
    return {
        type: SEARCH_EVENTS,
        events
    }
}

const getEventAction = (event) => {
    return {
        type: GET_ONE_EVENT,
        event
    }
}

const deleteEventAction = (id) => {
    return {
        type: DELETE_EVENT,
        id
    }
}

export const createEventThunk = (event, groupId) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/groups/${groupId}/events`, {
            method: 'POST',
            body: JSON.stringify(event)
        });

        const eventData = await res.json();

        dispatch(createEventAction(eventData));

        return eventData;

    } catch (e) {

        const errorRes = await e.json()
        return errorRes;
    }

}

export const addEventImageThunk = (id, data) => async dispatch => {

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("preview", data.preview);

    try {
        const resImg = await csrfFetch(`/api/events/${id}/images`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        const imageData = await resImg.json();

        dispatch(addEventImageAction(imageData));

        return imageData;

    } catch (e) {
        // console.log(e)
        const errorRes = await e.json()
        return errorRes;
    }

}

export const deleteEventThunk = (id) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/events/${id}`, {
            method: 'DELETE'
        });

        dispatch(deleteEventAction(id));

        return res;

    } catch (errors) {

        return errors;
    }
}

export const getEventThunk = (id) => async dispatch => {

    try {
        const res = await csrfFetch(`/api/events/${id}`);
        const event = await res.json();
        dispatch(getEventAction(event));
        return event;
    }
    catch (e) {
        if (e instanceof Response) return e;
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

export const searchEventsThunk = (params) => async dispatch => {

    const { name } = params;
    let query = '/api/events';
    if (name) query += `?name=${name}`;

    const res = await csrfFetch(query);
    // console.log("res after fetch on events thunk --->", res);

    const events = await res.json();
    if (res.ok) {
        // console.log("events in res.ok on events thunk --->", events);
        dispatch(searchEventsAction(events.Events));
    }
    else {
        // console.log("res in else (errors) on events thunk --->", res);
        return res.errors;
    }
}

const initialState = {
    allEvents: {},
    singleEvent: { EventImages: [], Group: {} }
}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS:
            {
                const eventsObj = {};
                for (let event of action.events) eventsObj[event.id] = event;
                return { ...state, allEvents: { ...eventsObj } };
            }
        case SEARCH_EVENTS:
            {
                const eventsObj = {};
                for (let event of action.events) eventsObj[event.id] = event;
                return { ...state, allEvents: { ...eventsObj } };
            }
        case GET_ONE_EVENT:
            {
                return { ...state, singleEvent: { ...state.singleEvent, ...action.event } };
            }
        case CREATE_EVENT:
            {
                return { ...state, singleEvent: { ...state.singleEvent, ...action.event } };
            }
        case ADD_EVENT_IMAGE:
            {
                return { ...state, singleEvent: { ...state.singleEvent, EventImages: [{ ...action.image }] } };
            }
        case DELETE_EVENT:
            {
                const newState = { ...state, allEvents: { ...state.allEvents }, singleEvent: { EventImages: [], Group: {} } };
                delete newState.allEvents[action.id];
                return newState;
            }
        default:
            return state
    }
}

export default eventsReducer;
