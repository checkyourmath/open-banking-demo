import { combineReducers } from '@reduxjs/toolkit';
import { configureStore as configureStoreRTK } from '@reduxjs/toolkit';
import { cartSlice } from './slices/cartSlice';
import { wishlistSlice } from './slices/wishlist-slice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const isWeb = typeof window !== 'undefined';


const persistConfig = {
  key: 'root',
  storage: isWeb ? require('redux-persist/lib/storage/session').default : storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  cart: cartSlice.reducer,
  wist: wishlistSlice.reducer,
}));

// Configure Redux store
const store = configureStoreRTK({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppPersistor = Persistor;

// Create persistor
export const persistor = persistStore(store);

export default store;
