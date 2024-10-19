import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CREATE_TEACHERS } from "../actions";

const queryCreateStudent = createQueryGraphQl(CREATE_TEACHERS);
const createStudent = createRedux('createStudent', queryCreateStudent);

export default createStudent;