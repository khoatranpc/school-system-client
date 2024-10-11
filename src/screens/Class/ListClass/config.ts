const queryClasses = `
query Classes($payload: ClassFilterInput){
    classes(payload: $payload){
       data {
             _id
       name
       isActive
        isDeleted
        schoolYearId{
            _id
            name
        }
        gradeLevelId{
            _id
            level
        }
       }
       limit
       page
       totalPage
       count
    }
}
`;
const queryCreateListClass = `
mutation CreateLisrtClass($payload: CreateListClassInput!){
    createListClass(payload: $payload){
        _id
       name
       isActive
        isDeleted
        schoolYearId{
        _id
        }
        gradeLevelId {
        _id
        }
    }
}
`;
export {
    queryClasses,
    queryCreateListClass
}