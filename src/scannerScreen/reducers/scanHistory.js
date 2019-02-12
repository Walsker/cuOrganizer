import {INITIATE_HISTORY, LOG_SCAN, UNDO_SCAN} from '../actionTypes';

export default (prevState = {}, action) =>
{
    switch (action.type)
    {
        case INITIATE_HISTORY:
            return Object.assign({}, action.payload, prevState);

        case LOG_SCAN:
            
            // Adding the new scan entry to the correct event
            var {event, entry} = action.payload;
            var updatedList = prevState[event];
            
            updatedList.push(entry);
            
            return Object.assign({[event]: updatedList}, prevState);

        case UNDO_SCAN:
            
            // Copying over everything but the removed scan
            var {event, email} = action.payload;
            var updatedList = [];
            console.log("UNDO: ", action.payload);

            for (entry of prevState[event])
            {
                if (entry.email != email)
                updatedList.push(entry);
            }
            
            console.log(updatedList);
            return Object.assign({}, prevState, {[event]: updatedList});

        default:
            return prevState;
    }
}