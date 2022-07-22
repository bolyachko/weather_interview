import { combineReducers } from 'redux';

//Reducers
import {weatherReducer as weather} from "./components/weather/reducer";

export const rootReducer = combineReducers({
  weather,
});