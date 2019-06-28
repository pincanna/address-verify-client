import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADDRESS_VERIFICATION_SEND_VERIFICATION_BEGIN,
  ADDRESS_VERIFICATION_SEND_VERIFICATION_SUCCESS,
  ADDRESS_VERIFICATION_SEND_VERIFICATION_FAILURE,
  ADDRESS_VERIFICATION_SEND_VERIFICATION_DISMISS_ERROR,
} from '../../../../src/features/address-verification/redux/constants';

import {
  sendVerification,
  dismissSendVerificationError,
  reducer,
} from '../../../../src/features/address-verification/redux/sendVerification';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('address-verification/redux/sendVerification', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when sendVerification succeeds', () => {
    const store = mockStore({});

    return store.dispatch(sendVerification())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADDRESS_VERIFICATION_SEND_VERIFICATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADDRESS_VERIFICATION_SEND_VERIFICATION_SUCCESS);
      });
  });

  it('dispatches failure action when sendVerification fails', () => {
    const store = mockStore({});

    return store.dispatch(sendVerification({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADDRESS_VERIFICATION_SEND_VERIFICATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADDRESS_VERIFICATION_SEND_VERIFICATION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSendVerificationError', () => {
    const expectedAction = {
      type: ADDRESS_VERIFICATION_SEND_VERIFICATION_DISMISS_ERROR,
    };
    expect(dismissSendVerificationError()).toEqual(expectedAction);
  });

  it('handles action type ADDRESS_VERIFICATION_SEND_VERIFICATION_BEGIN correctly', () => {
    const prevState = { sendVerificationPending: false };
    const state = reducer(
      prevState,
      { type: ADDRESS_VERIFICATION_SEND_VERIFICATION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendVerificationPending).toBe(true);
  });

  it('handles action type ADDRESS_VERIFICATION_SEND_VERIFICATION_SUCCESS correctly', () => {
    const prevState = { sendVerificationPending: true };
    const state = reducer(
      prevState,
      { type: ADDRESS_VERIFICATION_SEND_VERIFICATION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendVerificationPending).toBe(false);
  });

  it('handles action type ADDRESS_VERIFICATION_SEND_VERIFICATION_FAILURE correctly', () => {
    const prevState = { sendVerificationPending: true };
    const state = reducer(
      prevState,
      { type: ADDRESS_VERIFICATION_SEND_VERIFICATION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendVerificationPending).toBe(false);
    expect(state.sendVerificationError).toEqual(expect.anything());
  });

  it('handles action type ADDRESS_VERIFICATION_SEND_VERIFICATION_DISMISS_ERROR correctly', () => {
    const prevState = { sendVerificationError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADDRESS_VERIFICATION_SEND_VERIFICATION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendVerificationError).toBe(null);
  });
});

