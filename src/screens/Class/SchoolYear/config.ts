const queryCreateSchoolYear = `
mutation CreateSchoolYear($payload: SchoolYearInput!){
    createSchoolYear(payload: $payload){
        _id
        startDate
        endDate
        status
        name
    }
}
`;
export default queryCreateSchoolYear;