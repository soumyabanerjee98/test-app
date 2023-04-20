import { combineReducers } from "redux";
import { locationApiReducer, settingsReducer } from "./function";

const rootReducer = combineReducers({
  locationApi: locationApiReducer,
  settings: settingsReducer
});
export default rootReducer;
