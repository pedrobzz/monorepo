import { ApolloClient, InMemoryCache } from "@apollo/client";
import { baseAPIURL } from "../contants";

const client = new ApolloClient({
  uri: `${baseAPIURL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
