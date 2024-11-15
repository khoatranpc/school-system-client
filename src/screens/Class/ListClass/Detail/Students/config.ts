const queryStudentClasses = `#graphql
    query StudentClasses($payload: StudentClassesFilterInput){
        studentClasses(payload: $payload){
        data{
            _id
            type
            endDate
            startDate
            isActive
            isDeleted
            note
            studentId {
                _id
                code
                isActive
                isDeleted
                userId {
                    _id
                    isDeleted
                    name
                    email
                    address
                    dob
                    identity
                }
            }
        }
        page
        limit
        count
        }
    }
`;
const queryStudentsRNotInClass = `#graphql
    query Students($payload: StudentsInput) {
        students(payload: $payload){
            data{
                code
                _id
            userId {
                _id
                name
                email
                phoneNumber
            }
            }
                page
                limit
                totalPage
                count
        }
    }
`;

const mutationAddStudentsIntoClass = `#graphql
  mutation AddStudentsIntoClass($payload: AddStudentsToClassInput!) {
    addStudentsIntoClass(payload: $payload) {
        studentIds
    }
}
`;
export {
    queryStudentClasses,
    queryStudentsRNotInClass,
    mutationAddStudentsIntoClass
}