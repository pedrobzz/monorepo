import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { AppContextProvider } from "../common/context/appContext";
import client from "../common/libs/ApolloClient";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
