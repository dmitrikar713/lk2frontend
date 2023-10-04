import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

import profileReducer from '../pages/Profile/ProfileSlice';
import uploadProfileFileReducer from 'src/pages/Profile/UploadProfileFileSlice';
import requestsReducer from '../pages/Requests/RequestsSlice';
import requestReducer from '../pages/Requests/Request/RequestSlice';
import servicesReducer from '../pages/Services/ServicesSlice';
import serviceReducer from '../pages/Services/Service/ServiceSlice';
import notificationsReducer from '../pages/Notifications/NotificationsSlice';
import callbackReducer from 'src/pages/Callback/CallbackSlice';
import feedbackReducer from '../pages/Requests/Request/new/modals/Feedback/FeedbackSlice';
import detailsReducer from 'src/pages/Requests/Request/details/DetailsSlice';
import TestrouterReducer from '../pages/Testrouter/TestrouterSlice';
import exportsReducer from '../pages/Exports/ExportsSlice';
export const history = createBrowserHistory();

const persistConfig = {
  key: 'MEC-lk',
  version: 1,
  storage,
  blacklist: ['requestReducer'],
};

const rootReducer = combineReducers({
  profileReducer,
  TestrouterReducer,
  requestsReducer,
  requestReducer,
  servicesReducer,
  serviceReducer,
  notificationsReducer,
  callbackReducer,
  uploadProfileFileReducer,
  feedbackReducer,
  detailsReducer,
  exportsReducer,

  router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const initStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).prepend(apiMiddleware, routerMiddleware(history)),
    // .concat(logger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
