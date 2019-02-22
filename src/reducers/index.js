import * as ActionTypes from '../action-types'
import { INITIAL_STATE } from "./initialState";

export default function Reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.SELECT_FIAT:
            return {
                ...state,
                fiat: action.fiat
            };

        case ActionTypes.CHANGE_TICKERS:
            return {
                ...state,
                tickers: action.tickers
            };

        default:
            return state;
    }
}