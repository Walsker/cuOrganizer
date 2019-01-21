import {SAVE_NAME} from '../actionTypes';

export default (prevState = "", action) =>
{
    switch (action.type)
    {
        case SAVE_NAME:
            return action.payload;

        default:
            return prevState;
    }
}