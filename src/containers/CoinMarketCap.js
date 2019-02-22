import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ListView from '../components/views/List'
import Navigation from '../components/common/Navigation'
import SettingsView from '../components/views/Settings'
import DetailsView from '../components/views/Details'
import Error404 from '../components/views/Error404'
import { connect } from 'react-redux'
import * as ActionCreators from '../actions'
import { bindActionCreators } from 'redux'

class CoinMarketCap extends Component {
    componentDidMount() {
        const { dispatch, fiat } = this.props;

        ActionCreators.loadTickers(dispatch, fiat);
    }

    render() {
        const { dispatch, fiat, fiats, tickers } = this.props;
        const selectFiat = bindActionCreators(ActionCreators.selectFiat, dispatch);

        return (
            <div className="wrapper">
                <BrowserRouter>
                    <div>
                        <Navigation />
                        <div className="container">
                            <Switch>
                                <Route exact path="/list"
                                    render={() => (
                                        <ListView fiat={fiat}
                                                    fiats={fiats}
                                                    selectFiat={selectFiat}
                                                    tickers={tickers}
                                                    dispatch={dispatch} />
                                    )} />
                                <Route exact path="/settings"
                                    render={() => (
                                        <SettingsView fiat={fiat}
                                                        fiats={fiats}
                                                        selectFiat={selectFiat}
                                                        dispatch={dispatch} />
                                    )} />
                                <Route path="/details/:id"
                                    render={({match}) => (
                                        <DetailsView fiat={fiat}
                                                        tickers={tickers}
                                                        dispatch={dispatch}
                                                        match={match} />
                                    )} />
                                <Route exact path="/error404" component={Error404} />
                                <Redirect exact from="/" to="/list" />
                                <Redirect from="/" to="/error404" />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => (
    state
);

export default connect(mapStateToProps)(CoinMarketCap);