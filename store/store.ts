import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

export const configureStore = () => {
  const middleware = [thunk];
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );

  return { store };
};
