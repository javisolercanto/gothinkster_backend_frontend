import { gql } from 'apollo-server-express';

const Query = gql`
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
`;

import Serie from "../../graphql/schemas/series/serie.schema";
import Movie from "../../graphql/schemas/movies/movie.schema";
import User from "../../graphql/schemas/users/user.schema";

const typeDefs = [
    Query,
    Serie,
    Movie,
    User,
];

export default typeDefs;
