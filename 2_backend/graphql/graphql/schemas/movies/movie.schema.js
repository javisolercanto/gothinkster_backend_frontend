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
        duration: String,
        releaseYear: Int,
        favoritesCount: Int,
        author: User,
    }
`;

export default typeDefs;