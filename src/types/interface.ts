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
    CLASSES = 'CLASSES',
    GRADES = 'GRADES',
    CLASS_LIST = 'CLASS_LIST',
    DETAIL_CLASS = 'DETAIL_CLASS',
    TEACHERS = 'TEACHERS',

    DATA_BASE = 'DATA_BASE',
    TEACHER_POSITIONS = 'TEACHER_POSITIONS'
}
export interface ReduxState extends Obj {
    isLoading: boolean;
    data: any;
    message?: string;
    errors?: any;
    successful?: boolean;
    componentId?: string;
}

export enum Degree {
    HighSchool = "HighSchool",
    Associate = "Associate",
    Bachelor = "Bachelor",
    Master = "Master",
    Doctorate = "Doctorate",
    PostDoctorate = "PostDoctorate",
    Professor = "Professor",
    Engineer = "Engineer",
    Other = "Other"
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export enum TypeStudentInClass {
    Promoted = 'Promoted',
    Demoted = 'Demoted',
    Transfered = 'Transfered',
    Completed = 'Completed',
    Pending = 'Pending'
}