import { combineReducers } from "redux";
import { locationApiReducer } from "./function";

const rootReducer = combineReducers({
  locationApi: locationApiReducer,
});
export default rootReducer;
