import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { HOME_ROOM_TEACHERS } from "../actions";

const queryHomeRoomTeachers = createQueryGraphQl(HOME_ROOM_TEACHERS);
const homeroomTeachers = createRedux('homeroomTeachers', queryHomeRoomTeachers);

export default homeroomTeachers;