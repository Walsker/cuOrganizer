// Redux imports
import * as ACTION_TYPES from './actionTypes';

// Creating an action that creates an empty scanHistory
export const initiateHistory = (eventTitles) =>
{
    let payload = {};
    for (event of eventTitles)
        payload[event.id] = [];

    console.log("HISTORY: ", eventTitles, payload);
    return {type: ACTION_TYPES.INITIATE_HISTORY, payload};
};

// Creating an action that adds a scan to the history list
export const logScan = (event, email, firstName, lastName) =>
{
    return {
        type: ACTION_TYPES.LOG_SCAN,
        payload: {event, entry: {email, firstName, lastName}}
    };
};

// Creating an action that locally undoes a scan
export const undoScan = (event, hackerID) =>
{
    return {
        type: ACTION_TYPES.UNDO_SCAN,
        payload: {event, id: hackerID}
    };
};