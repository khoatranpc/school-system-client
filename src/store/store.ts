import { configureStore } from '@reduxjs/toolkit';
import authenticated from './reducers/authenticated';
import currentUser from './reducers/currentUser';
import listStudent from './reducers/listStudent';
import createSchoolYear from './reducers/createSchoolYear';
import listSchoolYear from './reducers/listSchoolYear';
import gradeLevels from './reducers/gradeLevels';
import createGradeLevel from './reducers/createGradeLevel';
import classes from './reducers/classes';
import createListClass from './reducers/createListClass';
import teacherPositions from './reducers/teacherPositions';
import createTeacherPosition from './reducers/createTeacherPosition';
import createTeacher from './reducers/createTeacher';
import teachers from './reducers/teachers';
import createStudent from './reducers/createStudent';
import studentClasses from './reducers/studentClasses';
import detailClass from './reducers/detailClass';
import addStudentsIntoClass from './reducers/addStudentIntoClass';
import saveHomeRoomTeacher from './reducers/savehomeroomteacher';

export const store = configureStore({
    reducer: {
        authenticated: authenticated.slice.reducer,
        currentUser: currentUser.slice.reducer,
        listStudent: listStudent.slice.reducer,
        createSchoolYear: createSchoolYear.slice.reducer,
        listSchoolYear: listSchoolYear.slice.reducer,
        gradeLevels: gradeLevels.slice.reducer,
        createGradeLevel: createGradeLevel.slice.reducer,
        classes: classes.slice.reducer,
        createListClass: createListClass.slice.reducer,
        teacherPositions: teacherPositions.slice.reducer,
        createTeacherPosition: createTeacherPosition.slice.reducer,
        createTeacher: createTeacher.slice.reducer,
        teachers: teachers.slice.reducer,
        createStudent: createStudent.slice.reducer,
        studentClasses: studentClasses.slice.reducer,
        detailClass: detailClass.slice.reducer,
        addStudentsIntoClass: addStudentsIntoClass.slice.reducer,
        saveHomeRoomTeacher: saveHomeRoomTeacher.slice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;