import * as ACTION_TYPES from './actionTypes';

// Creating an action that saves the event types fetched from firebase
export const updateEventTypes = (eventTitles) =>
{
    return {
        type: ACTION_TYPES.UPDATE_EVENT_TYPES,
        payload: eventTitles
    };
}