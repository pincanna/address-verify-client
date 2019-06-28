import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Form, Segment, Message} from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'

export class VerificationForm extends Component {
  static propTypes = {
    addressVerification: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    const {code} = this.props.addressVerification
    e.preventDefault();
    alert(code)
    this.props.actions.sendVerification({verification_code: code})
  }

  render() {
    return (
      <div className="address-verification-verification-form">
        <Message positive attached>
          <Message.Header>Welcome!</Message.Header>
          <p className="instructions">To complete your address verification, enter the verification code exactly as it appears on the letter you received in the mail:</p>
        </Message>
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
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
            <Form.Button disabled={this.props.addressVerification.sendVerificationPending} positive>Submit</Form.Button>
          </Form>
        </Segment>
        {!!this.props.addressVerification.response && <Message>
          <p><strong>Status:</strong> {this.props.addressVerification.response['status']}</p>
          <p><strong>Address:</strong> <br />
          {this.props.addressVerification.response['address']['address_line1']} <br />
          {this.props.addressVerification.response['address']['address_line2'] ? this.props.addressVerification.response['address']['address_line2'] + '</br>' : null}
          {this.props.addressVerification.response['address']['address_city']}, {this.props.addressVerification.response['address']['address_state']} {this.props.addressVerification.response['address']['address_zip']}
          </p>
        </Message> }
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
