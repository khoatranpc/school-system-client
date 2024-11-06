import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { DETAIL_CLASS } from "../actions";

const queryDetailClass = createQueryGraphQl(DETAIL_CLASS);
const detailClass = createRedux('detailClass', queryDetailClass);

export default detailClass;