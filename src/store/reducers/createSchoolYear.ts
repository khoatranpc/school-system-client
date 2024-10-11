import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CREATE_SCHOOL_YEAR } from "../actions";

const queryCreateSchoolYear = createQueryGraphQl(CREATE_SCHOOL_YEAR);
const createSchoolYear = createRedux('createSchoolYear', queryCreateSchoolYear);
export default createSchoolYear;