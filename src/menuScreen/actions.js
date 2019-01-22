import * as ACTION_TYPES from './actionTypes';

// Creating an action that selects an event
export const selectEvent = (eventKey) =>
{
    return {
        type: ACTION_TYPES.SELECT_EVENT,
        payload: eventKey
    };
}