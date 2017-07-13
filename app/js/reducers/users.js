import {
  FETCH_USERS,
} from '../constants/action_types';

const defaultState = [];

const usersReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USERS:
      return payload;

    default:
      return state;
  }
};

export default usersReducer;
