const queryTeacherPositions = `
query TeacherPositions($payload: TeacherPositionFilterInput) {
    teacherPositions(payload:$payload){
        data {
            _id
            name
            code
            des
            isActive
            isDeleted
        }
    }
}
`;
const queryCreateTeacherPosition = `
mutation CreateTeacherPosition($payload: CreateTeacherPositionInput!) {
    createTeacherPosition(payload: $payload){
         _id
        name
        code
        des
        isActive
        isDeleted
    }

}
`
export {
    queryTeacherPositions,
    queryCreateTeacherPosition
}