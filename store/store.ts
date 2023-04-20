import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const persistConfig = {
  key: 'root',
  storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(thunk)
)

export const persistor = persistStore(store)

