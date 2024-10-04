import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { AUTHENICATED } from "../actions";

const queryAuthenticated = createQueryGraphQl(AUTHENICATED);
const authenticated = createRedux('authenticated', queryAuthenticated);
export default authenticated;