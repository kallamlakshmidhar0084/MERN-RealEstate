import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./users/userSlice.js"
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
//to make data store in the local storage 
const rootReducer =combineReducers({user : userReducer});
const persistConfig={
  key:'root',
  storage,
  version:1,
}
const persistedReducer=persistReducer( persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer ,
  middleware  : (buildGetDefaultMiddleware)=>buildGetDefaultMiddleware({
    serializableCheck:false,
  })
})

export const persistor=persistStore(store);