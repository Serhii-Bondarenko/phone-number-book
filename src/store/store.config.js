import { configureStore } from '@reduxjs/toolkit';

import appReducer from './app.slice';

const store = configureStore({
    reducer: {
        appReducer
    }
});

export default store;
