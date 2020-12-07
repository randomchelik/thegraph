
const moment = require('moment')
const _ = require('lodash')
const fetch = require('cross-fetch')
const { ApolloClient, HttpLink } = require('@apollo/client/core')
const { InMemoryCache } = require('@apollo/client/cache')
const { gql } = require('@apollo/client/core')

// https://thegraph.com/explorer/subgraph/smallonotation/eth2-genesis-analytics
const uri = 'https://api.thegraph.com/subgraphs/name/smallonotation/eth2-genesis-analytics'

const link = new HttpLink({ fetch, uri })
const cache = new InMemoryCache()
const client = new ApolloClient({ link, cache })


const start = moment.utc().startOf('day')
const end = moment.utc().endOf('day')

const query = gql(`
{
  top_20: depositors (first: 20, orderBy: totalAmountDeposited, orderDirection: desc) {
      id
      depositCount
      totalAmountDeposited
  }
  last_20: deposits (first: 20, orderBy: timestamp, orderDirection: desc) {
      id
      amount
      public_Key
      timestamp
      depositor { id }
  }
  last_1000: deposits (first: 1000, orderBy: timestamp, orderDirection: desc) {
      amount
      depositor { id }
  }
  chart_9: deposits (first: 1000, where: { timestamp_gt: ${start.format('X')}, timestamp_lte: ${end.format('X')} }) { amount }
  chart_8: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_7: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_6: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_5: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_4: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_3: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_2: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
  chart_1: deposits (first: 1000, where: { timestamp_gt: ${start.subtract(1, 'day').format('X')}, timestamp_lte: ${end.subtract(1, 'day').format('X')} }) { amount }
}`)


const load_data = () => {
  return client.query({ query }).then(result => {
    //console.log(result.data)

    const prepare = chart_data => {
      return {
        amount: _.sumBy(chart_data, v => +v.amount),
        count: chart_data.length
      }
    }

    return {
      top_20: result.data.top_20,
      last_20: result.data.last_20,
      last_1000: {
        sum_deposits: _.sumBy(result.data.last_1000, v => +v.amount),
        uniq_deposits: _.uniqBy(result.data.last_1000, v => v.depositor.id).length
      },
      chart: {
        9: prepare(result.data.chart_9),
        8: prepare(result.data.chart_8),
        7: prepare(result.data.chart_7),
        6: prepare(result.data.chart_6),
        5: prepare(result.data.chart_5),
        4: prepare(result.data.chart_4),
        3: prepare(result.data.chart_3),
        2: prepare(result.data.chart_2),
        1: prepare(result.data.chart_1),
      }
    }
  })
}


module.exports = {
  load_data
}
