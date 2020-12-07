
const _ = require('lodash')
const fetch = require('cross-fetch')
const { ApolloClient, HttpLink } = require('@apollo/client/core')
const { InMemoryCache } = require('@apollo/client/cache')
const { gql } = require('@apollo/client/core')

// https://thegraph.com/explorer/subgraph/1inch-exchange/one-inch-v2
const uri = 'https://api.thegraph.com/subgraphs/name/1inch-exchange/one-inch-v2'

const link = new HttpLink({ fetch, uri })
const cache = new InMemoryCache()
const client = new ApolloClient({ link, cache })


const query = gql(`
{
  most_swaps_1000: swaps (first: 1000, orderBy: timestamp, orderDirection: desc) {
      pair {
          toToken {
              symbol
              tradeCount
              tradeVolume
          }
      }
  }
  last_swaps_20: swaps (first: 20, orderBy: timestamp, orderDirection: desc) {
      sender { id }
      toAmount
      fromAmount
      pair {
          toToken { symbol }
          fromToken { symbol }
      }
      timestamp
  }
}`)


const load_data = () => {
  return client.query({ query }).then(result => {
    //console.log(result.data)

    return {
      most_swaps_1000: _.chain(result.data.most_swaps_1000)
        .groupBy(v => v.pair.toToken.symbol)
        .toPairs()
        .map(v => {
          return [
            v[0],
            v[1].length,
            v[1][0].pair.toToken.tradeCount,
            v[1][0].pair.toToken.tradeVolume
          ]
        })
        .sortBy(kv => kv[1])
        .reverse()
        .slice(0, 30)
        .map(v => {
          return {
            symbol: v[0],
            count_for_1000: v[1],
            total_count: +v[2],
            total_volume: v[3],
          }
        })
        .value(),
      last_swaps_20: _.map(result.data.last_swaps_20, v => {
        return {
          account: v.sender.id,
          toToken: v.pair.toToken.symbol,
          fromToken: v.pair.fromToken.symbol,
          toAmount: v.toAmount,
          fromAmount: v.fromAmount,
          timestamp: v.timestamp,
        }
      }),
    }
  })
}


module.exports = {
  load_data
}
