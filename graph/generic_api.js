
const { ApolloClient, HttpLink } = require('@apollo/client/core')
const { InMemoryCache } = require('@apollo/client/cache')
const fetch = require('cross-fetch')
const { gql } = require('@apollo/client/core')

module.exports = (uri, query) => {
  const link = new HttpLink({ fetch, uri })
  const cache = new InMemoryCache()
  return {
    client: new ApolloClient({ link, cache }),
    query: gql(query)
  }
}
