import { configureStore } from '@reduxjs/toolkit';
import authenticated from './reducers/authenticated';
import currentUser from './reducers/currentUser';
import listStudent from './reducers/listStudent';

export const store = configureStore({
    reducer: {
        authenticated: authenticated.slice.reducer,
        currentUser: currentUser.slice.reducer,
        listStudent: listStudent.slice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;