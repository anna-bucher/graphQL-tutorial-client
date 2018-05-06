import './styles/index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AUTH_TOKEN } from 'src/constants'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { App } from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import registerServiceWorker from './registerServiceWorker'

const link = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorization = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization,
    },
  })
  if (forward) {
    return forward(operation)
  } else {
    return null
  }
}).concat(new HttpLink({ uri: 'http://localhost:4000' }))

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  link,
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
