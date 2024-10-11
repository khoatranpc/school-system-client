const queryListSchoolYear = `
query SchoolYears ($payload:SchoolYearFilter){
    schoolYears(payload: $payload){
        _id
        startDate
        endDate
        isDeleted
        name
    }
}
`;
export {
    queryListSchoolYear
}