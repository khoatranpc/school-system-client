import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CREATE_TEACHER } from "../actions";

const queryCreateTeacher = createQueryGraphQl(CREATE_TEACHER);
const createTeacher = createRedux('createTeacher', queryCreateTeacher);

export default createTeacher;