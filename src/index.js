import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import CoinMarketCap from './containers/CoinMarketCap';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

const store = createStore(
    Reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <CoinMarketCap />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
