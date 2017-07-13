import {
  SET_DETAILS,
} from '../constants/action_types';

const defaultState = {};

const detailsReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DETAILS:
      return payload;

    default:
      return state;
  }
};

export default detailsReducer;
