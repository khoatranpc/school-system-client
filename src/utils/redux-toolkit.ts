import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { Obj, ReduxState } from "../types/interface";
import axiosInstance from "./axios";
import { createHook, ReturnCreateHook } from ".";
import { RootState } from "../store/store";


export const createQueryGraphQl = (typeAction: string) => {
    return createAsyncThunk(typeAction, async (args) => {
        try {
            const result = await axiosInstance.post('/graphql', args);
            if (result.data.errors) {
                throw {
                    errors: result.data.errors
                };
            }
            return result.data;
        } catch (err: any) {
            if (err.response.data.errors) throw new Error(JSON.stringify(err.response.data.errors));
            throw new Error(JSON.stringify(err.errors));
        }
    });
}
export type TypeQueryGraphQL = ReturnType<typeof createQueryGraphQl>;
const init: ReduxState = {
    data: null,
    isLoading: false
}

const createRedux = (name: string, asyncThunk: TypeQueryGraphQL): {
    slice: Slice,
    hook: () => ReturnCreateHook
} => {
    const hookRedux: () => ReturnCreateHook = createHook(name as keyof RootState, asyncThunk);
    const slice = createSlice({
        initialState: init,
        name,
        reducers: {
            clear(state) {
                state.data = null;
                state.errors = undefined;
                state.isLoading = false;
                state.message = '';
            }
        },
        extraReducers(builder) {
            builder.addCase(asyncThunk.pending, (state, action) => {
                state.isLoading = true;
                state.componentId = ((action.meta.arg as unknown as Obj)?.variables as Obj)?.componentId as string;
                state.errors = undefined;
            });
            builder.addCase(asyncThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.componentId = ((action.meta.arg as unknown as Obj)?.variables as Obj)?.componentId as string;
                state.data = (action.payload as Obj)?.data;
                state.errors = undefined;
                state.successful = true;
            });
            builder.addCase(asyncThunk.rejected, (state, action) => {
                state.data = undefined;
                state.isLoading = false;
                state.successful = false;
                console.log(action);
                const getMessageError = (JSON.parse(action.error?.message as string) as Obj[])?.map((item) => item.message as string)?.join('\n');
                state.errors = getMessageError;
            });
        },
    });
    return {
        slice,
        hook: hookRedux
    }
}

export default createRedux;