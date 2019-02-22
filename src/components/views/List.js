import React, { Component } from 'react';
import { PageHeader, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import * as ActionCreators from '../../actions'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import PropTypes from 'prop-types';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../../styles/List.css'

class List extends Component {
    onSelect(fiatItem) {
        const fiat = this.props.fiat;
        const selectFiat = this.props.selectFiat;
        const dispatch = this.props.dispatch;
        selectFiat(fiatItem);
        if (fiat !== fiatItem)
            ActionCreators.loadTickers(dispatch, fiatItem);
    }

    render() {
        const fiat = this.props.fiat;
        const fiats = this.props.fiats;
        const tickers = this.props.tickers;
        const { SearchBar } = Search;
        /**
         * Columns Formater
         */
        const priceFormatter = (cell, row) => {
            if (row.onSale) {
                return (
                <span>
                    <strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong>
                </span>
                );
            }
            return (
                <span>{ cell } {fiat === 'usd' ? '$' : fiat === 'eur' ? '€' : '¥'}</span>
            );
        }
        const changeFormater = cell => <span style={ cell >= 0 ? { color: 'green' } : { color: 'red' } }>{ cell } %</span>
        const nameFormater = (cell, row) => <span><img src={`https://s2.coinmarketcap.com/static/img/coins/16x16/${row.rank}.png`} alt="logo crypto"/> { cell }</span>
        const columns = [{
            dataField: 'rank',
            text: 'Rank',
            sort: true
        }, 
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
            formatter: nameFormater
        }, 
        {
            dataField: `price_${fiat}`,
            text: 'Price',
            sort: true,
            formatter: priceFormatter
        },
        {
            dataField: `market_cap_${fiat}`,
            text: 'Market Cap',
            sort: true,
            formatter: priceFormatter
        },
        {
            dataField: `24h_volume_${fiat}`,
            text: 'Volume (24h)',
            sort: true
        },
        {
            dataField: 'available_supply',
            text: 'Circulating Supply',
            sort: true
        },
        {
            dataField: 'percent_change_24h',
            text: 'Change (24H)',
            sort: true,
            formatter: changeFormater,
            formatExtraData: {
                up: 'glyphicon glyphicon-chevron-up',
                down: 'glyphicon glyphicon-chevron-down'
            }
        }];
        /**
         * Footer Custom
         */
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                Showing { from } to { to } of { size } Results
            </span>
            );
        /**
         * Pagination options
         */
        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            hidePageListOnlyOnePage: true,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '25',
                value: 25
            }, {
                text: '50',
                value: 50
            }, {
                text: 'All',
                value: tickers.length
            }] // A numeric array is also available. the purpose of above example is custom the text
        };
/**
 * ===========================================================================================================================
 */
        return (
            <div className="list-view">
                <PageHeader>Top 100 crypto currencies
                    <ButtonToolbar>
                    <DropdownButton title={fiat.toUpperCase()} id="list-fiat-dropdown" bsStyle="primary">
                        {
                            fiats.map((fiatItem) =>
                                <MenuItem key={fiatItem}
                                        active={fiat === fiatItem}
                                        onSelect={() => this.onSelect(fiatItem)}>
                                    {fiatItem.toUpperCase()}
                                </MenuItem>
                            )
                        }
                    </DropdownButton>
                </ButtonToolbar>
                </PageHeader>
                <ToolkitProvider
                    keyField="id"
                    data={ tickers }
                    columns={ columns }
                    search
                    >
                    {
                        props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
                            <hr />
                            <BootstrapTable keyField='id' data={ tickers } columns={ columns } { ...props.baseProps } pagination={ paginationFactory(options) }/>
                        </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        )
    }
}

List.propTypes = {
    fiat: PropTypes.string.isRequired,
    tickers: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default List;