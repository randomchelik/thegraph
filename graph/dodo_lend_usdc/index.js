
const requireGQL = require('require-graphql-file')

// https://thegraph.com/explorer/subgraph/leckylao/dodo-lend-usdc
const uri = 'https://api.thegraph.com/subgraphs/name/leckylao/dodo-lend-usdc'
const query = requireGQL('query')

module.exports = require('../generic_api')(uri, query)
