
const requireGQL = require('require-graphql-file')

// https://thegraph.com/explorer/subgraph/protofire/loopring-3_1
const uri = 'https://api.thegraph.com/subgraphs/name/protofire/loopring-3_1'
const query = requireGQL('query')

module.exports = require('../generic_api')(uri, query)
