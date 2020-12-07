
const _ = require('lodash')
const fetch = require('cross-fetch')
const { ApolloClient, HttpLink } = require('@apollo/client/core')
const { InMemoryCache } = require('@apollo/client/cache')
const { gql } = require('@apollo/client/core')

// https://thegraph.com/explorer/subgraph/pengiundev/curve-finance
const uri = 'https://api.thegraph.com/subgraphs/name/pengiundev/curve-finance'

const link = new HttpLink({ fetch, uri })
const cache = new InMemoryCache()
const client = new ApolloClient({ link, cache })

const query = gql(`
{
  unique_tokens: tokens (first: 1000) {
      symbol
  }
  pools (first: 1000) {
      address
      coinCount
      coins (first: 1000) { symbol }
      events (first: 1000) { transaction }
      exchanges (first: 1000) {
          tokensBought
          tokensSold
          transaction
      }
      poolToken { symbol }
      underlyingCoins (first: 1000) { symbol }
      virtualPrice
  }
  tokenExchanges (first: 1000) {
      pool { id }
      timestamp
      tokensBought
      tokensSold
      transaction
  }
}`)


const load_data = () => {
  return client.query({ query }).then(result => {
    //console.log(result.data)

    return {
      unique_tokens: result.data.unique_tokens.length,
      total_pools: result.data.pools.length,
      total_sold: _.sumBy(result.data.tokenExchanges, v => BigInt(v.tokensSold)),
      total_bought: _.sumBy(result.data.tokenExchanges, v => BigInt(v.tokensBought)),
      events: _.chain(result.data.pools)
        .flatMap(pool => pool.events)
        .groupBy(event => event.__typename)
        .mapValues(v => v.length)
        .toPairs()
        .sortBy(kv => kv[1])
        .reverse()
        .map(v => {
          return {
            event: v[0],
            count: v[1],
          }
        })
        .value()
    }
  })
}


module.exports = {
  load_data
}
