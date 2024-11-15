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

const queryHomeRoomTeachers = `#graphql
     query HomeRoomTeacher($payload: FindHomeRoomTeacher!) {
        homeroomTeachers(payload: $payload) {
            data {
                _id
                teacherId {
                    _id
                    degrees {
                        type
                        major
                    }
                    userId {
                        _id
                        name
                    }
                }
                schoolYearId {
                    _id
                    name
                }
                classId {
                    _id
                }
                isActive
                isDeleted
                createdAt
                updatedAt
            }
            limit
            page
            count
        }
    }
`;

const queryCountStudentInClass = `#graphql
    query CountStudentInClass($payload: CountStudentInClassInput!) {
            countStudentInClass(payload: $payload) {
            count
            classId
            }
    }
`;
export {
    querySaveHomeroomTeacher,
    queryHomeRoomTeachers,
    queryCountStudentInClass
}