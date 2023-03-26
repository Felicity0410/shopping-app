const ItemModel = require('../models/item')

const getItems = async (req, res) => {
    const { page = 1, pageSize = 100 } = req.query

    const limit = pageSize * 1
    const skip = limit * Math.max(page * 1, 1 )
    const items = await ItemModel.find().limit(limit).skip(skip).exec()
    res.json({ items })
}

module.exports = {
    getItems
}