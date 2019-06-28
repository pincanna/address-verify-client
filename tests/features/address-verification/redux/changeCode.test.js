import {
  ADDRESS_VERIFICATION_CHANGE_CODE,
} from '../../../../src/features/address-verification/redux/constants';

import {
  changeCode,
  reducer,
} from '../../../../src/features/address-verification/redux/changeCode';

describe('address-verification/redux/changeCode', () => {
  it('returns correct action by changeCode', () => {
    expect(changeCode()).toHaveProperty('type', ADDRESS_VERIFICATION_CHANGE_CODE);
  });

  it('handles action type ADDRESS_VERIFICATION_CHANGE_CODE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADDRESS_VERIFICATION_CHANGE_CODE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
