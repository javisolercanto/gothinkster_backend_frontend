import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        movie(slug: String!): Movie
        movies: [Movie]
        moviesConfig(limit: Int, offset: Int, type: String, userid: String): [Movie]
        moviesCount: Int
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