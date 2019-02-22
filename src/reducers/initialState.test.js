import { INITIAL_STATE } from "./initialState";

describe('initial state', () => {

    it('+++ is properly set', () => {
        expect(Array.isArray(INITIAL_STATE.fiats)).toBe(true);
        expect(typeof INITIAL_STATE.fiat === 'string').toBe(true);
        expect(Array.isArray(INITIAL_STATE.tickers)).toBe(true);

        expect(INITIAL_STATE.fiats.length).toBeGreaterThan(1);
        expect(INITIAL_STATE.tickers.length).toBe(0);

        expect(INITIAL_STATE.fiats).toContain(INITIAL_STATE.fiat);
    });

});

