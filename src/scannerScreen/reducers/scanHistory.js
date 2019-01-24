import {INITIATE_HISTORY, DO_SCAN, UNDO_SCAN} from '../actionTypes';

export default (prevState = {}, action) =>
{
    switch (action.type)
    {
        case INITIATE_HISTORY:
            return Object.assign(action.payload, prevState);

        case DO_SCAN:
            
            // Adding the new scan entry to the correct event
            var {event, entry} = action.payload;
            var updatedList = prevState[event];
            
            updatedList.push(entry);
            
            return Object.assign({}, prevState, {[event]: updatedList});

        case UNDO_SCAN:
            
            // Copying over everything but the removed scan
            var {event, id} = action.payload;
            var updatedList = [];

            for (var entry in prevState[event])
            {
                if (prevState[event][entry].id != id)
                updatedList.push(prevState[event][entry]);
            }
            
            return Object.assign({}, prevState, {[event]: updatedList});

        default:
            return prevState;
    }
}