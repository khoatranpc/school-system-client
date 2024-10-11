const queryCreateGrade = `
mutation CreateGradeLevel($payload: GradeLevelInput!){
    createGradeLevel(payload: $payload){
        _id
        name
        level
        des
    }
}`;
export {
    queryCreateGrade
}