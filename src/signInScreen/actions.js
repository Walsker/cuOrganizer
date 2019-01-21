import * as ACTION_TYPES from './actionTypes';

// Creating an action that saves the organizers name to the app
export const saveName = (name) =>
{
    return {
        type: ACTION_TYPES.SAVE_NAME,
        payload: name
    };
}