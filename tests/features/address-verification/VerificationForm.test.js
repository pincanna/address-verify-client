import React from 'react';
import { shallow } from 'enzyme';
import { VerificationForm } from '../../../src/features/address-verification/VerificationForm';

describe('address-verification/VerificationForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      addressVerification: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <VerificationForm {...props} />
    );

    expect(
      renderedComponent.find('.address-verification-verification-form').length
    ).toBe(1);
  });
});
