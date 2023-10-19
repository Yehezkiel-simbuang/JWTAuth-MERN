import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userStore from './user/userSlice.js';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userStore });
const peristConfig = {
    key: 'root',
    version: 1,
    storage
}
const persistReduce = persistReducer(peristConfig, rootReducer);

export const store = configureStore({
    reducer: persistReduce,
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware)({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);