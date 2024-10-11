import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { LIST_SCHOOL_YEAR } from "../actions";

const queryListSchoolYear = createQueryGraphQl(LIST_SCHOOL_YEAR);
const listSchoolYear = createRedux('listSchoolYear', queryListSchoolYear);

export default listSchoolYear;