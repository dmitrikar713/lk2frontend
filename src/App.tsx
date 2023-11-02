import React, { ReactElement, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { initStore } from './store/store';
import { Layout } from './Layout';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const store = initStore();

const persistor = persistStore(store);

export function App(): ReactElement {
  return (
    // <StrictMode>
    <Router>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Layout />
        {/* </PersistGate> */}
      </Provider>
    </Router>
    // </StrictMode>
  );
}
