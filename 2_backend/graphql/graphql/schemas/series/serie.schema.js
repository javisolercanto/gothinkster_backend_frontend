import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        serie(slug: String!): Serie
        series: [Serie]
    }
    type Serie {
        id: ID!
        slug: String!
        title: String
        seasons: Int
        image: String
        category: String
        favoritesCount: Int
        tagList: [String]
        createdAt: Date
        updatedAt: Date
    }
`;

export default typeDefs;