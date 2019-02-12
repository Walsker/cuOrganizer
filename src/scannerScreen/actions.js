// Redux imports
import * as ACTION_TYPES from './actionTypes';

// Creating an action that creates an empty scanHistory
export const initiateHistory = (eventTitles) =>
{
    let payload = {};
    for (let event in eventTitles)
        payload[event] = [];

    return {type: ACTION_TYPES.INITIATE_HISTORY, payload};
};

// Creating an action that adds a scan to the history list
export const doScan = (event, scanEntry) =>
{
    return {
        type: ACTION_TYPES.DO_SCAN,
        payload: {event, entry: scanEntry}
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