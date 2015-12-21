import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Popover, OverlayTrigger} from 'react-bootstrap';

let Balance = React.createClass({
  render: function() {
    return (
      <div className="text-overflow">
        <OverlayTrigger trigger={['hover', 'click']} placement='bottom' rootClose={true} overlay={
            <Popover id="popover-balance">
              <div className="text-overflow">
                <span className="text-orange">
                  <FormattedNumber value={ this.props.user.user.balanceSub } />
                </span> { this.props.market.market.name }{' / '}
                <span className="text-light">{ this.props.user.user.balance } SOIL</span>
              </div>
            </Popover>} >
          <span>
            <b><FormattedMessage id='balance' />:</b> <span className="text-orange">
              <FormattedNumber value={ this.props.user.user.balanceSub } />
            </span> { this.props.market.market.name }{' / '}
            <span className="text-light">
              { this.props.user.user.balanceFormatted &&
                <FormattedMessage
                  id='soil'
                  values={{
                    value: this.props.user.user.balanceFormatted.value,
                    unit: this.props.user.user.balanceFormatted.unit
                  }}
                /> }
            </span>
          </span>
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = Balance;
