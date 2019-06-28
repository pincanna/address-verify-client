import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Form, Segment} from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'

export class VerificationForm extends Component {
  static propTypes = {
    addressVerification: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  letterOrNumber = /[a-z0-9]/

  render() {
    return (
      <div className="address-verification-verification-form">
        <Segment>
          <Form>
            <div className="field">
              <label htmlFor="code">Verification Code</label>
              <MaskedInput
                name="code"
                autoFocus={true}
                value={this.props.addressVerification.code}
                onChange={(e) => this.props.actions.changeCode(e.target.value)}
                mask={[
                  /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, '-',
                  /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, '-',
                  /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, '-',
                  /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, '-',
                  /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/, /[a-z0-9]/
                  ]}
              />
            </div>
          </Form>
        </Segment>
        
        
        <code>{this.props.addressVerification.code}</code>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    addressVerification: state.addressVerification,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationForm);
