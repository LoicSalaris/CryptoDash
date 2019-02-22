import { INITIAL_STATE } from "./initialState";
import reducer from "./index";
import * as ActionTypes from '../action-types'

const TICKERS = [
    {
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "rank": "1",
        "price_usd": "573.137",
        "price_btc": "1.0",
        "24h_volume_usd": "72855700.0",
        "market_cap_usd": "9080883500.0",
        "available_supply": "15844176.0",
        "total_supply": "15844176.0",
        "percent_change_1h": "0.04",
        "percent_change_24h": "-0.3",
        "percent_change_7d": "-0.57",
        "last_updated": "1472762067"
    }
];

describe('reducers', () => {

    let state = INITIAL_STATE;

    it('+++ select fiat', () => {
        for(let i=0; i<100; i++){
            let randomFiat = state.fiats[Math.floor(Math.random() * state.fiats.length)];
            let newState = reducer(state, {type: ActionTypes.SELECT_FIAT, fiat: randomFiat});

            expect(newState.fiat === randomFiat).toBe(true);
        }
    });


    it('+++ change tickers', () => {
        for(let i=0; i<100; i++){
            let newState = reducer(state, {type: ActionTypes.CHANGE_TICKERS, tickers: TICKERS});

            expect(newState.tickers[0] === TICKERS[0]).toBe(true);
        }
    });
});