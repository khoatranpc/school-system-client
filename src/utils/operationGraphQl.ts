const querySaveHomeroomTeacher = `#graphql
    mutation SaveHomeRoomTeacher($payload: SaveHomeRoomTeacher!) {
        savehomeroomteacher(payload: $payload) {
            classId {
                _id
            }
            teacherId {
                _id
            }
            schoolYearId {
                _id
            }
            isActive
            isDeleted
        }
    }
`;


export {
    querySaveHomeroomTeacher
}