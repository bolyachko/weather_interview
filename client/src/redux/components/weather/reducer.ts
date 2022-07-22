// Types
import { types } from './types';

const initialState = {
  data: null,
  task: null,
  isFetching: false,
  error: null,
};

export const weatherReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case types.WEATHER_START_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case types.WEATHER_STOP_FETCHING:
      return {
        ...state,
        isFetching: false
      }
    case types.WEATHER_ERROR_FETCHING:
      return {
        ...state,
        data: null,
        error: action.payload
      }
    case types.WEATHER_FILL:
      return {
        ...state,
        data: action.payload,
        error: null
      }

    default:
      return state;
  }
}