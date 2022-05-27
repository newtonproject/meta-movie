import { ApolloProvider } from "@apollo/client";
import client from "services";
import "../styles/globals.scss";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../utils/contractUtil";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ApolloProvider>
  );
}

export default MyApp;
