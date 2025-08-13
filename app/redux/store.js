import { combineReducers } from 'redux';
import userReducer from "./slice/userSlice"; // your slice
import cartReducer from "./slice/cartSlice"
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import { configureStore } from '@reduxjs/toolkit';


// Persist config
const persistConfig = {
  key: 'root',   // key in storage
  storage,       // storage engine (localStorage)
  whitelist: ['user','cart'] // slices you want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
  // add more reducers here
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);