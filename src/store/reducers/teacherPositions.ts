import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { QUERY_TEACHER_POSITIONS } from "../actions";

const queryTeacherPositions = createQueryGraphQl(QUERY_TEACHER_POSITIONS);
const teacherPositions = createRedux('teacherPositions', queryTeacherPositions);

export default teacherPositions;