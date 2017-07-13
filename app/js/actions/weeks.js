import {
  FETCH_WEEKS,
  PUT_WEEK,
} from '../constants/action_types';
import API from '../services/api';

function fetchWeeks(data) {
  return {
    type: FETCH_WEEKS,
    payload: API.fetchWeeks(data),
  };
}

function putWeek(data, callback) {
  return {
    type: PUT_WEEK,
    payload: API.putWeek(data, callback),
  };
}

export {
  fetchWeeks,
  putWeek,
};
