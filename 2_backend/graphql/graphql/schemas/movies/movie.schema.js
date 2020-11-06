import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        movie(slug: String!): Movie
        movies: [Movie]
    }
    extend type Mutation {
        createMovie(input: MovieInput): Movie
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
    input MovieInput {
        title: String!
        director: String
        duration: String
        releaseYear: Int
        author: String
    }
`;

export default typeDefs;