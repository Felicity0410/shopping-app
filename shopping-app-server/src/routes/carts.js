const { Router } = require('express')
const { getCart, updateCart } = require('../controllers/carts')

const cartRouter = Router()

cartRouter.get('', getCart)
cartRouter.put('', updateCart)

module.exports = cartRouter