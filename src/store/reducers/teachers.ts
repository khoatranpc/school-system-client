import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { TEACHERS } from "../actions";

const queryTeachers = createQueryGraphQl(TEACHERS);
const teachers = createRedux('teachers', queryTeachers);

export default teachers;