import { useDispatch, useSelector } from "react-redux";
import { v6 } from 'uuid';
import { AppDispatch, RootState } from "../store/store";
import { Degree, Obj, ReduxState } from "../types/interface";
import React from "react";

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
const configHeaderCell = (config?: React.HTMLAttributes<any>): React.HTMLAttributes<any> => {
    return {
        ...config,
        className: 'bg-[var(--base-soft)!important]'
    }
}
const DegreeTranslation: { [key in Degree]: string } = {
    [Degree.HighSchool]: "Trung học phổ thông",
    [Degree.Associate]: "Cao đẳng",
    [Degree.Bachelor]: "Cử nhân",
    [Degree.Engineer]: "Kỹ sư",
    [Degree.Master]: "Thạc sĩ",
    [Degree.Doctorate]: "Tiến sĩ",
    [Degree.PostDoctorate]: "Hậu Tiến sĩ",
    [Degree.Professor]: "Giáo sư",
    [Degree.Other]: "Khác"
};

export {
    createHook,
    uuid,
    configHeaderCell,
    DegreeTranslation
}