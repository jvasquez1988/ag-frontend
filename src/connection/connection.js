import {ApolloClient, InMemoryCache} from '@apollo/client';
export class ConnectionService {

  static getGraphqClient() {
    return new ApolloClient({
      uri: process.env.REACT_APP_GRAPHQL_URL || '',
      cache: new InMemoryCache(),
    });
  }

}