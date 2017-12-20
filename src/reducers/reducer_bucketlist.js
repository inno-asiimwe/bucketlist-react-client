import _ from 'lodash';
import {
  GET_BUCKETLISTS_SUCCESS,
  DELETE_BUCKETLIST_SUCCESS,
  GET_BUCKETLIST_SUCCESS,
  DELETE_BUCKETLIST_ITEM_SUCCESS
} from '../actions/action_bucketlist';

export const initialState = { };
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUCKETLISTS_SUCCESS:
      return _.mapKeys(action.payload.data, 'id');
    case DELETE_BUCKETLIST_SUCCESS:
      return _.omit(state, action.payload.data.bucketlist);
    case GET_BUCKETLIST_SUCCESS:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data,
        current: action.payload.data
      };
    case DELETE_BUCKETLIST_ITEM_SUCCESS:
      return state;
    default:
      return state;
  }
};

