import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/address-verification/DefaultPage';

describe('address-verification/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      addressVerification: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.address-verification-default-page').length
    ).toBe(1);
  });
});
