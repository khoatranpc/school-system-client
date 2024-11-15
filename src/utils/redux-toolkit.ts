import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { Obj, ReduxState } from "../types/interface";
import axiosInstance from "./axios";
import { createHook, ResponseCallback, ReturnCreateHook } from ".";
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
            if (err.errors) throw new Error(JSON.stringify(err.errors));
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
    const slice = createSlice({
        initialState: init,
        name,
        reducers: {
            clear(state) {
                state.data = null;
                state.errors = undefined;
                state.isLoading = false;
                state.message = '';
                state.successful = undefined;
            }
        },
        extraReducers(builder) {
            builder.addCase(asyncThunk.pending, (state, action) => {
                state.isLoading = true;
                state.componentId = ((action.meta.arg as unknown as Obj)?.variables as Obj)?.componentId as string;
                state.errors = undefined;
            });
            builder.addCase(asyncThunk.fulfilled, (state, action) => {
                const getVariables = ((action.meta.arg as unknown as Obj)?.variables as Obj);
                state.isLoading = false;
                state.componentId = getVariables?.componentId as string;
                state.data = (action.payload as Obj)?.data;
                state.errors = undefined;
                state.successful = true;
                (getVariables?.callback as ResponseCallback)?.(true, '');

            });
            builder.addCase(asyncThunk.rejected, (state, action) => {
                const getVariables = ((action.meta.arg as unknown as Obj)?.variables as Obj);
                state.data = undefined;
                state.isLoading = false;
                state.successful = false;
                const getMessageError = (JSON.parse(action.error?.message as string) as Obj[])?.map((item) => item.message as string)?.join('\n');
                state.errors = getMessageError;
                (getVariables?.callback as ResponseCallback)?.(false, getMessageError);
            });
        },
    });
    const hookRedux: () => ReturnCreateHook = createHook(name as keyof RootState, asyncThunk, slice.actions.clear);
    return {
        slice,
        hook: hookRedux,
    }
}

export default createRedux;