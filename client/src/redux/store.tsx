import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './loadingSlice';

const store = configureStore({
    reducer: {
        loaderReducer
    }
})

export default store;