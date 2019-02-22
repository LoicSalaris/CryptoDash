import React, { Component } from 'react';
import { PageHeader, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import * as ActionCreators from '../../actions'
import PropTypes from 'prop-types';

class Settings extends Component {
    onSelect(fiatItem) {
        const fiat = this.props.fiat;
        const selectFiat = this.props.selectFiat;
        const dispatch = this.props.dispatch;

        selectFiat(fiatItem);
        if (fiat !== fiatItem)
            ActionCreators.loadTickers(dispatch, fiatItem);
    }

    render() {
        const fiats = this.props.fiats;
        const fiat = this.props.fiat;

        return (
            <div className="settings-view">
                <PageHeader>Settings <small>for fiat</small></PageHeader>
                <ButtonToolbar>
                    <DropdownButton title={fiat.toUpperCase()} id="fiat-dropdown" bsStyle="primary">
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
            </div>
        )
    }
}

Settings.propTypes = {
    fiat: PropTypes.string.isRequired,
    fiats: PropTypes.array.isRequired,
    selectFiat: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Settings;