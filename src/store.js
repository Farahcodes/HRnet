import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * `employeeSlice`
 *
 * This slice is responsible for managing the employee state within the Redux store.
 * The slice contains an initial state and reducers to manage different state updates.
 *
 * `initialState`: An object that describes the initial state of the employee slice of the store.
 *  - `employees`: An array meant to hold employee objects.
 *
 * `reducers`: An object containing Redux reducer functions.
 *  - `add`: A reducer that takes the current state and an action, and adds a new employee object to the state.
 */

const employeeSlice = createSlice({
  name: 'employee',
  initialState: { employees: [] },
  reducers: {
    add(state, action) {
      state.employees = [...state.employees, { ...action.payload }];
    },
  },
});

/**
 * `persistConfig`
 *
 * This configuration object is used to define how the redux state is persisted.
 *
 * `key`: The key for the persisted state in local storage.
 * `version`: Version number of the reducer.
 * `storage`: Define which storage engine to use.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

/**
 * `persistedReducer`
 *
 * Uses the `persistReducer` method from `redux-persist` to enhance the base reducer
 * with persistence capabilities, wrapping the employeeSlice reducer with persist functionality.
 */
const persistedReducer = persistReducer(
  persistConfig,
  employeeSlice.reducer
);

/**
 * `store`
 *
 * Uses `configureStore` from Redux Toolkit to create the application’s store
 * `reducer`: The reducer function implemented by `persistedReducer`.
 * `middleware`: Customizes the middleware using `getDefaultMiddleware` to ensure
 *               the persistence actions do not get flagged in the serializable check middleware.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

/**
 * `persistor`
 *
 * Uses `persistStore` to create a persistor object based on the configured store,
 * which will be used to manage the store’s persistence lifecycle.
 */
const persistor = persistStore(store);

export { store, persistor };
export const { add } = employeeSlice.actions;
