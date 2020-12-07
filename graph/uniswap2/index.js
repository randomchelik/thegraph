
const requireGQL = require('require-graphql-file')

// https://thegraph.com/explorer/subgraph/oleksiivinogradov/uniswapv2
const uri = 'https://api.thegraph.com/subgraphs/name/oleksiivinogradov/uniswapv2'
const query = requireGQL('query')

module.exports = require('../generic_api')(uri, query)
