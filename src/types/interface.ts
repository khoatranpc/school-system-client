export interface Obj {
    [k: string]: any;
}
export enum Role {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
}
export interface Router {
    active: boolean;
    key: KeyTab;
    link: string;
    isHidden?: boolean;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: this[];
}
export enum KeyTab {
    DASHBOARD = 'DASHBOARD',
    STUDENTS = 'STUDENTS',
    STUDENTS_LIST = 'STUDENTS_LIST',
    STUDENTS_DETAIL = 'STUDENTS_DETAIL',
    STUDENTS_RANK = 'STUDENTS_RANK',
    SCHOOL_YEAR = 'SCHOOL_YEAR',
    CLASSES = 'CLASSES'
}
export interface ReduxState extends Obj {
    isLoading: boolean;
    data: any;
    message?: string;
    errors?: any;
    successful?: boolean;
    componentId?: string;
}