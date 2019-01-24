// Firebase imports
import firebase from '@firebase/app';
import '@firebase/database';

// Redux imports
import * as ACTION_TYPES from './actionTypes';

// Creating an action that creates an empty scanHistory
export const initiateHistory = (eventTypes) =>
{
    var payload = {};
    for (var event in eventTypes)
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