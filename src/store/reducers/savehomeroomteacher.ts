import createRedux, { createQueryGraphQl } from "@/src/utils/redux-toolkit";
import { SAVE_HOME_ROOM_TEACHER } from "../actions";

const querySaveHomeroomTeacher = createQueryGraphQl(SAVE_HOME_ROOM_TEACHER);

const saveHomeRoomTeacher = createRedux('saveHomeRoomTeacher', querySaveHomeroomTeacher);

export default saveHomeRoomTeacher;