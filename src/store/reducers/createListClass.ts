import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CREATE_CLASSES } from "../actions";

const queryCreateListClass = createQueryGraphQl(CREATE_CLASSES);

const createListClass = createRedux('createListClass', queryCreateListClass);

export default createListClass;