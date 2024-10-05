import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { CURRENT_USER_INFO } from "../actions";

const queryCurrentUser = createQueryGraphQl(CURRENT_USER_INFO);
const currentUser = createRedux('currentUser', queryCurrentUser);

export default currentUser;