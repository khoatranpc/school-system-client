import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CLASSES } from "../actions";

const queryClasses = createQueryGraphQl(CLASSES);

const classes = createRedux('classes', queryClasses);

export default classes;