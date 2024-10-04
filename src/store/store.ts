import { configureStore } from '@reduxjs/toolkit';
import authenticated from './reducers/authenticated';

export const store = configureStore({
    reducer: {
        authenticated: authenticated.slice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;