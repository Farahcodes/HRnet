// Importing required dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './index.scss';

// Importing main application and employee list components.
import App from './App';
import EmployeeList from './EmployeeList';

// Importing the Redux store and its persistor.
import { store, persistor } from './store.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    {/* Providing Redux store to the entire application. */}
    <Provider store={store}>
      {/* Wrapping application inside PersistGate to ensure the state is rehydrated properly from offline storage. */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Wrapping application inside BrowserRouter to enable routing. */}
        <BrowserRouter>
          {/* Defining application routes. */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
