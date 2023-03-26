const mongoose = require('mongoose')
const ItemModel = require('./src/models/item')
const { randNumber, randDrinks } = require('@ngneat/falso');

const items = Array(10000).fill(0).map((i) => {
    return {
        unitPrice: randNumber(),
        name: randDrinks()
    }
})

mongoose.connect('mongodb://localhost:27017/CMSExercise').then(() => {
    ItemModel.insertMany(items).then(() => {
        console.log('insert done');
    })
})

