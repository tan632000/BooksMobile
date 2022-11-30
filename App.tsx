import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "marana::stepzen.net+1000::9415a2b417a41c17f8d8294adcbc6a2ed08efbcbc4a9c4ea38f645b7d38acfa8";

const client = new ApolloClient({
  uri: "https://marana.stepzen.net/api/punk-peacock/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
