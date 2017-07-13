import {
  FETCH_USERS,
} from '../constants/action_types';
import API from '../services/api';

function fetchUsers() {
  return {
    type: FETCH_USERS,
    payload: API.fetchUsers(),
  };
}

export {
  fetchUsers,
};
