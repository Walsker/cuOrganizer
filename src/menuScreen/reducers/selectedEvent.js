import {SELECT_EVENT} from '../actionTypes';

export default (prevState = {}, action) =>
{
    switch (action.type)
    {
        case SELECT_EVENT:
            return action.payload;
        
        default:
            return prevState;
    }
}