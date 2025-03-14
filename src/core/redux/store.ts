import {ConfigureStoreOptions, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {reactotron} from '../reactotron/reactotron-config';
import {reduxStorage} from '../storage/mmkv';
import {errorMiddleware} from './middleware/errorMiddleware';
import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware({});

const options: ConfigureStoreOptions = {
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware, errorMiddleware),
};

if (__DEV__) {
  options.enhancers = getDefaultEnhancers =>
    getDefaultEnhancers().concat(reactotron.createEnhancer!());
}

export const store = configureStore(options);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
