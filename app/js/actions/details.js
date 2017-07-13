import {
  SET_DETAILS,
} from '../constants/action_types';

function setDetails(details) {
  return {
    type: SET_DETAILS,
    payload: details,
  };
}

export {
  setDetails,
};
