import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { QUERY_LIST_STUDENT } from "../actions";

const queryListStudent = createQueryGraphQl(QUERY_LIST_STUDENT);
const listStudent = createRedux('listStudent', queryListStudent);

export default listStudent;