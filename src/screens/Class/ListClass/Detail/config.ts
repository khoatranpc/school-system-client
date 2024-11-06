const queryDetailClass = `#graphql
    query DetailClass($payload: DetailClassInput!) {
        detailClass(payload: $payload){
            _id
            name
            schoolYearId {
                _id
                name
                status
                startDate
                endDate
            }
            isActive
            isDeleted
            gradeLevelId{
                _id
            }
        }
    }
`;

export {
    queryDetailClass
}