import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { ADD_STUDENT_INTO_CLASS } from "../actions";

const queryAddStudentIntoClass = createQueryGraphQl(ADD_STUDENT_INTO_CLASS);
const addStudentsIntoClass = createRedux('addStudentsIntoClass', queryAddStudentIntoClass);

export default addStudentsIntoClass;