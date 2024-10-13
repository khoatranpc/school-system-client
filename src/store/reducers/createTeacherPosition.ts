import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CREATE_TEACHER_POSITIONS } from "../actions";

const queryCreateTeacherPosition = createQueryGraphQl(CREATE_TEACHER_POSITIONS);
const createTeacherPosition = createRedux('createTeacherPosition', queryCreateTeacherPosition);

export default createTeacherPosition;