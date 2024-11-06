import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { STUDENT_CLASSES } from "../actions";

const queryStudentClasses = createQueryGraphQl(STUDENT_CLASSES);

const studentClasses = createRedux('studentClasses', queryStudentClasses);

export default studentClasses;
