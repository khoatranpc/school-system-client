const queryGradeLevels = `
    query GradeLevels{
        gradeLevels{
            _id
            name
            level
            des
        }
    }
`;

export {
    queryGradeLevels
}