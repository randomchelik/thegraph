
var express = require('express')
var router = express.Router()
var graph = require('../graph/client')

const asyncHandler = fn =>
  (req, res, next) =>
    Promise
      .resolve(fn(req, res, next))
      .catch(next)

router.get('/', (req, res) => res.render('index'))

router.get('/dodo', asyncHandler(async (req, res, next) =>
  res.render('coin', {
    title: 'Graph: Dodo Lend Usdc',
    data: await graph.dodo_lend_usdc()
  })
))
router.get('/dodo/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.dodo_lend_usdc()
  })
))
router.get('/api/dodo', asyncHandler(async (req, res, next) =>
  res.json(await graph.dodo_lend_usdc())
))

router.get('/loopring', asyncHandler(async (req, res, next) =>
  res.render('loopring', {
    title: 'Graph: Loopring',
    data: await graph.loopring_v3()
  })
))
router.get('/loopring/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.loopring_v3()
  })
))
router.get('/api/loopring', asyncHandler(async (req, res, next) =>
  res.json(await graph.loopring_v3())
))

router.get('/1inch', asyncHandler(async (req, res, next) =>
  res.render('1inch', {
    title: 'Graph: 1inch exchange',
    data: await graph.one_inch_exchange()
  })
))
router.get('/1inch/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.one_inch_exchange()
  })
))
router.get('/api/1inch', asyncHandler(async (req, res, next) =>
  res.json(await graph.one_inch_exchange())
))

router.get('/curve', asyncHandler(async (req, res, next) =>
  res.render('curve', {
    title: 'Graph: Curve Finance',
    data: await graph.curve_finance()
  })
))
router.get('/curve/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.curve_finance()
  })
))
router.get('/api/curve', asyncHandler(async (req, res, next) =>
  res.json(await graph.curve_finance())
))

router.get('/eth2dep', asyncHandler(async (req, res, next) =>
  res.render('eth2dep', {
    title: 'Graph: Ethereum 2.0 Deposits',
    data: await graph.eth2_deposits()
  })
))
router.get('/eth2dep/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.eth2_deposits()
  })
))
router.get('/api/eth2dep', asyncHandler(async (req, res, next) =>
  res.json(await graph.eth2_deposits())
))

router.get('/uniswap', asyncHandler(async (req, res, next) =>
  res.render('uniswap', {
    title: 'Graph: Uniswap v2',
    data: await graph.uniswap2()
  })
))
router.get('/uniswap/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.uniswap2()
  })
))
router.get('/api/uniswap', asyncHandler(async (req, res, next) =>
  res.json(await graph.uniswap2())
))

router.get('/gnosis', asyncHandler(async (req, res, next) =>
  res.render('gnosis', {
    title: 'Graph: Gnosis',
    data: await graph.gnosis()
  })
))
router.get('/gnosis/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.gnosis()
  })
))
router.get('/api/gnosis', asyncHandler(async (req, res, next) =>
  res.json(await graph.gnosis())
))

router.get('/balancer', asyncHandler(async (req, res, next) =>
  res.render('balancer', {
    title: 'Graph: Balancer',
    data: await graph.balancer()
  })
))
router.get('/balancer/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.balancer()
  })
))
router.get('/api/balancer', asyncHandler(async (req, res, next) =>
  res.json(await graph.balancer())
))

router.get('/bancor', asyncHandler(async (req, res, next) =>
  res.render('bancor', {
    title: 'Graph: Bancor',
    data: await graph.bancor()
  })
))
router.get('/bancor/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.bancor()
  })
))
router.get('/api/bancor', asyncHandler(async (req, res, next) =>
  res.json(await graph.bancor())
))

router.get('/synthetix', asyncHandler(async (req, res, next) =>
  res.render('synthetix', {
    title: 'Graph: Synthetix',
    data: await graph.synthetix()
  })
))
router.get('/synthetix/pre', asyncHandler(async (req, res, next) =>
  res.render('pre', {
    data: await graph.synthetix()
  })
))
router.get('/api/synthetix', asyncHandler(async (req, res, next) =>
  res.json(await graph.synthetix())
))

module.exports = router
