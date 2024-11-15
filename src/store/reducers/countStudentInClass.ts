import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { COUNT_STUDENT_IN_CLASS } from "../actions";

const query = createQueryGraphQl(COUNT_STUDENT_IN_CLASS);
const countStudentInClass = createRedux('countStudentInClass', query);
export default countStudentInClass;