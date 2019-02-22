import React, { Component } from 'react';
import { PageHeader, Button, Table } from 'react-bootstrap'
import * as ActionCreators from "../../actions";
import PropTypes from 'prop-types';

class Details extends Component {
    render() {
        const id = this.props.match.params.id;
        const fiat = this.props.fiat;
        const tickers = this.props.tickers;
        const dispatch = this.props.dispatch;

        const ticker = tickers.find(tickerElement => tickerElement.id === id);
        if(!ticker){
            return null;
        }

        const mapper = [
            {key: 'rank', title: 'Rank'},
            {key: 'name', title: 'Name'},
            {key: 'symbol', title: 'Symbol'},
            {key: ['price_' + fiat], title: 'Price ' + fiat.toUpperCase()},
            {key: ['24h_volume_' + fiat], title: '24h Volume ' + fiat.toUpperCase()},
            {key: ['market_cap_' + fiat], title: 'Market Cap ' + fiat.toUpperCase()},
            {key: 'price_btc', title: 'Price BTC'},
            {key: 'percent_change_1h', title: '1h Change in %'},
            {key: 'percent_change_24h', title: '24h Change in %'},
            {key: 'percent_change_7d', title: '7d Change in %'},
            {key: 'total_supply', title: 'Total Supply'},
            {key: 'available_supply', title: 'Available Supply'}
        ];

        return (
            <div className="details-view">
                <PageHeader>Details <small>of {ticker.symbol}</small>
                    <Button bsStyle="primary"
                            className="pull-right"
                            onClick={() => ActionCreators.loadTickers(dispatch, fiat)}>Refresh</Button>
                </PageHeader>
                <Table responsive hover>
                    <tbody>
                    {
                        mapper.map(item => (
                            <tr key={item.key}>
                                <td>{item.title}</td>
                                <td>{ticker[item.key]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

Details.propTypes = {
    fiat: PropTypes.string.isRequired,
    tickers: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
};

export default Details;