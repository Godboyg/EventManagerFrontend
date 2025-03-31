import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./Slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistEvent = persistReducer(persistConfig , eventReducer);

const store = configureStore({
    reducer: {
        event : persistEvent
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, 
        }),
})

export const persistor = persistStore(store)

export default store;