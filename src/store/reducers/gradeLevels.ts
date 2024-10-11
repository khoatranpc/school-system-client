import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { GRADE_LEVELS } from "../actions";

const queryGradeLevels = createQueryGraphQl(GRADE_LEVELS);
const gradeLevels = createRedux('gradeLevels', queryGradeLevels);

export default gradeLevels;