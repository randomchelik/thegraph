
const requireGQL = require('require-graphql-file')

// https://thegraph.com/explorer/subgraph/synthetixio-team/synthetix-exchanger
const uri = 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix-exchanger'
const query = requireGQL('query')

module.exports = require('../generic_api')(uri, query)
