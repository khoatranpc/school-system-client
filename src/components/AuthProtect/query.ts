export const query = `query GetOneUserInfo($payload: GetUser) {
    getOneUserInfo(payload: $payload) {
        name
        _id
        role
    }
}`;

