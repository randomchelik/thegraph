
const { ApolloClient } = require('@apollo/client/core')

/**
 * @param {{client: ApolloClient, query}} api
 * @return {function(): Promise}
 */
const callback = api => () =>
  api.client
    .query({ query: api.query })
    .then(result => result.data)

module.exports = {
  dodo_lend_usdc: callback(require('./dodo_lend_usdc')),
  loopring_v3: callback(require('./loopring_v3')),
  one_inch_exchange: require('./one_inch_exchange').load_data,
  curve_finance: require('./curve_finance').load_data,
  eth2_deposits: require('./eth2_deposits').load_data,
  uniswap2: callback(require('./uniswap2')),
  gnosis: callback(require('./gnosis')),
  balancer: callback(require('./balancer')),
  bancor: callback(require('./bancor')),
  synthetix: callback(require('./synthetix')),
}
