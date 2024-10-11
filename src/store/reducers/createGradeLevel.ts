import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CREATE_GRADE_LEVELS } from "../actions";

const queryCreateGradeLevel = createQueryGraphQl(CREATE_GRADE_LEVELS);

const createGradeLevel = createRedux('createGradeLevel', queryCreateGradeLevel);

export default createGradeLevel;