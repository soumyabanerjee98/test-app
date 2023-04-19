import { combineReducers } from "redux";
import { searchLocationReducer } from "./function";

const rootReducer = combineReducers({
  searchLocation: searchLocationReducer,
});
export default rootReducer;
