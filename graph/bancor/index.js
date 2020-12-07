
const requireGQL = require('require-graphql-file')

// https://thegraph.com/explorer/subgraph/blocklytics/bancor
const uri = 'https://api.thegraph.com/subgraphs/name/blocklytics/bancor'
const query = requireGQL('query')

module.exports = require('../generic_api')(uri, query)
