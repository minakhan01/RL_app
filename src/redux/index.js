import configureStore from "./configureStore";
import reducers from "./reducers";
import { rootSaga } from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Persist
const persistConfig = {
  key: "rl-app",
  storage: storage,
  whitelist: ["test","past"], // which reducer want to store
};
const finalReducers = persistReducer(persistConfig, reducers);

const { store } = configureStore(finalReducers, rootSaga);
const persistor = persistStore(store);

export { store, persistor };
