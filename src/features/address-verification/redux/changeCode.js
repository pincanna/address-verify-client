// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ADDRESS_VERIFICATION_CHANGE_CODE,
} from './constants';

export function changeCode(code) {
  return {
    type: ADDRESS_VERIFICATION_CHANGE_CODE,
    code: code,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADDRESS_VERIFICATION_CHANGE_CODE:
      return {
        ...state,
        code: action.code
      };

    default:
      return state;
  }
}
