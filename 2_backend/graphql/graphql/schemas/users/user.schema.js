import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        user(username: String!): User
        users: [User]
    }
    type User {
        id: ID!
        social: String
        username: String
        email: String
        image: String
        bio: String
        hash: String
        salt: String
        following: [User]
        karma: Int
        type: Boolean
    }
`;

export default typeDefs;