import { merge } from 'lodash';

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

import SerieResolvers from "../../graphql/resolvers/series/series.resolver";
import MovieResolvers from "../../graphql/resolvers/movies/movies.resolver";
import UserResolvers from "../../graphql/resolvers/users/user.resolver";

const resolvers = merge(
  QueryResolvers,
  SerieResolvers,
  MovieResolvers,
  UserResolvers,
);

export default resolvers;