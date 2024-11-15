import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v6 } from 'uuid';
import { AppDispatch, RootState } from "../store/store";
import { Degree, Obj, ReduxState, TypeStudentInClass } from "../types/interface";

export type Action = "Read" | "Create" | "Update" | "Delete" | 'All';
type QueryHook = { query: string, operationName: string, path: string, action: Action, payload?: Obj, componentId?: string };

export type ResponseCallback = (successful: boolean, messageFromResponse: string, dataState?: any) => void;
export type FunctionQueryHook = ({ query, operationName, path, action, payload, componentId }: QueryHook, callback?: ResponseCallback) => void;

const createHook = (state: keyof RootState, queryGraphQl: Function, clearReducer?: Function) => {
    return () => {
        const data = useSelector((states: RootState) => states[state]) as ReduxState;
        const dispatch = useDispatch<AppDispatch>();
        const query: FunctionQueryHook = ({ query, operationName, path, action, payload, componentId }: { query: string, operationName: string, path: string, action: Action, payload?: Obj, componentId?: string }, callback) => {
            dispatch(queryGraphQl({
                variables: {
                    operationName,
                    path,
                    action,
                    payload,
                    componentId,
                    callback
                },
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
    query: FunctionQueryHook;
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
const TypeStudentInClassTranslations: { [key in TypeStudentInClass]: string } = {
    [TypeStudentInClass.Promoted]: 'Lên lớp',
    [TypeStudentInClass.Demoted]: 'Lưu ban',
    [TypeStudentInClass.Transfered]: 'Chuyển lớp',
    [TypeStudentInClass.Completed]: 'Hoàn thành',
    [TypeStudentInClass.Pending]: 'Chờ xử lý'
};
export {
    createHook,
    uuid,
    configHeaderCell,
    DegreeTranslation,
    TypeStudentInClassTranslations
}