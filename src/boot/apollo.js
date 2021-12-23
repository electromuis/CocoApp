import { ApolloClient /*, createHttpLink */ } from '@apollo/client/core'
import { ApolloClients } from '@vue/apollo-composable'

import { boot } from 'quasar/wrappers'
import { getClientOptions } from 'src/apollo'
import ApolloComponents from '@vue/apollo-components'
import { createApolloProvider } from '@vue/apollo-option'

export default boot(
  async ({ app }) => {
    // Default client.
    const options = await getClientOptions(/* {app, router ...} */)
    const apolloClient = new ApolloClient(options)
    
    const apolloClients = {
      default: apolloClient
    }

    const apolloProvider = createApolloProvider({
      defaultClient: apolloClient,
      defaultOptions: {
        $query: {
          fetchPolicy: 'cache-and-network',
          notifyOnNetworkStatusChange: true,
        },
      }
    })

    app.provide(ApolloClients, apolloClients)
    apolloProvider.install(app)
    ApolloComponents.install(app)
  }
)
