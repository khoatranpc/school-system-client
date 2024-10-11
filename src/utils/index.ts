import { useDispatch, useSelector } from "react-redux";
import { v6 } from 'uuid';
import { AppDispatch, RootState } from "../store/store";
import { Obj, ReduxState } from "../types/interface";

export type Action = "Read" | "Create" | "Update" | "Delete" | 'All';
const createHook = (state: keyof RootState, queryGraphQl: Function, clearReducer?: Function) => {
    return () => {
        const data = useSelector((states: RootState) => states[state]) as ReduxState;
        const dispatch = useDispatch<AppDispatch>();
        const query = ({ query, operationName, path, action, payload, componentId }: { query: string, operationName: string, path: string, action: Action, payload?: Obj, componentId?: string }) => {
            dispatch(queryGraphQl({
                variables: { operationName, path, action, payload, componentId },
                query
            }),);
        }
        const clear = () => {
            dispatch(clearReducer?.());
        }
        return {
            data,
            query,
            clear
        }
    }
}

const uuid = () => {
    return v6();
}
export interface ReturnCreateHook {
    data: ReduxState,
    query: ({ query, operationName, path, action, payload, componentId }: { query: string, operationName: string, path: string, action: Action, payload?: Obj, componentId?: string }) => void;
    clear?: () => void;
}
export {
    createHook,
    uuid
}