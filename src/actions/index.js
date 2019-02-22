import * as ActionTypes from '../action-types'
import axios from 'axios'

export const selectFiat = fiat => {
    return {
        type: ActionTypes.SELECT_FIAT,
        fiat
    };
};

export const loadTickers = (dispatch, fiat) => {
    const queryString = (fiat === 'usd' ? '' : '?convert=' + fiat.toUpperCase());

    return axios.get('https://api.coinmarketcap.com/v1/ticker/' + queryString)
        .then(response => {
            dispatch(changeTickers(response.data));
        });
};

export const changeTickers = (tickers) => {
    return {
        type: ActionTypes.CHANGE_TICKERS,
        tickers
    };
};