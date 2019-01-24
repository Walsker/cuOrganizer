import {UNDO_SCAN} from '../actionTypes';

export default (prevState = [], action) =>
{
    switch (action.type)
    {
        case UNDO_SCAN:
            return action.payload;

        default:
            return prevState;
    }
}