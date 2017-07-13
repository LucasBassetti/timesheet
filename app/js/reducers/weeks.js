import {
  FETCH_WEEKS,
  PUT_WEEK,
} from '../constants/action_types';

const defaultState = [];

const weeksReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_WEEKS:
      return payload;

    case PUT_WEEK: {
      const newWeek = payload;
      const weekIds = state.map(w => w.week_id);
      const weekIndex = weekIds.indexOf(newWeek.week_id);
      state[weekIndex] = newWeek;
      return [...state];
    }

    default:
      return state;
  }
};

export default weeksReducer;
