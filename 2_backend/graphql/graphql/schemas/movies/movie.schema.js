import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        movie(slug: String!): Movie
        movies: [Movie]
    }
    type Movie {
        id: ID!
        slug: String!
        title: String
        director: String,
        duration: Int,
        releaseYear: Int,
    }
`;

export default typeDefs;