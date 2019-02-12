import {UPDATE_EVENT_TYPES} from '../actionTypes';

export default (prevState = [], action) =>
{
    switch (action.type)
    {
        case UPDATE_EVENT_TYPES:
            return action.payload;

        default:
            return prevState;
    }
}