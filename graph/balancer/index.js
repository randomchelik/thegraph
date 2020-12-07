
const requireGQL = require('require-graphql-file')

// https://thegraph.com/explorer/subgraph/balancer-labs/balancer
const uri = 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer'
const query = requireGQL('query')

module.exports = require('../generic_api')(uri, query)
